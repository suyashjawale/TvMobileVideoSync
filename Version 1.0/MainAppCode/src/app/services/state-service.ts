import { Injectable, signal } from '@angular/core';
import { CardList } from '../interface/card-list';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    movies_list = signal<CardList[]>([]);
    selected_ind = signal<number>(0);

    constructor(private http: HttpClient) {
        this.http.get<CardList[]>('/movie_data.json').subscribe(data => {
            return this.movies_list.set(data);
        });
    }
}
