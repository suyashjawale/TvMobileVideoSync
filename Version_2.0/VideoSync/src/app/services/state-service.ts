import { Injectable, signal } from '@angular/core';
import { CardList } from '../interfaces/card-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	movies_list = signal<CardList[]>([]);
	movies_ind = signal<number>(0);

	capitalizeFirstLetter(str:string) {
		if (str.length === 0) {
			return ""; // Handle empty strings
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	constructor(private http: HttpClient) {
		let urls: CardList[] = [];

		for (const url of [`http://${window.location.hostname}:8080/sdcard_video/`,`http://${window.location.hostname}:8080/storage_video/`]) {

			this.http.get(url, { responseType: 'text' })
				.subscribe(data => {
					const extension = [".mp4", ".avi", ".mov", ".mkv", ".webm"];
					const parser = new DOMParser();
					const doc = parser.parseFromString(data.toString(), 'text/html');
					const links = Array.from(doc.querySelectorAll('a'))
						.map(a => a.getAttribute('href'))
						.filter((link): link is string => {
							if (!link) return false;
							const ext = '.' + (link.split('.').pop() ?? '');
							return extension.includes(ext);
						}).map(link => {
							let chunk = link.split("-")
							urls.push({
								title1: this.capitalizeFirstLetter(chunk[0]).replaceAll("_"," "),
								title2: chunk[1].replaceAll("_","-"),
								filename: url + link,
								thumbnail: url + chunk[2].replace(".mkv", ".jpg")
							})
						});
					this.movies_list.update((currentItems) => [...currentItems, ...urls]);
				});
		}
	}


}
