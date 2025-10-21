import { Injectable, signal } from '@angular/core';
import { CardList } from '../interface/card-list';
import movies from '../../../public/movie_data.json';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    movies_list = signal<CardList[]>(movies);
    selected_ind = signal<number>(0);
}
