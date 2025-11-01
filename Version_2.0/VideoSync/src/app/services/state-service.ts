import { Injectable, signal } from '@angular/core';
import { CardList } from '../interfaces/card-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	movies_list = signal<CardList[]>([]);
	movies_ind = signal<number>(0);

	constructor(private http: HttpClient) {
		this.http.get<CardList[]>('/movie_data.json').subscribe(data => {
			this.movies_list.set(data);
		});
	}
}
