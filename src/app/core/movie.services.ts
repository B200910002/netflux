import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Movie } from './movies';
import { environments } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  sortSubject$: Subject<any> = new Subject();
  searchSubject$: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  onSort(event: any) {
    console.log('onSearch');
    this.sortSubject$.next(event);
  }

  onSearch(event: any) {
    this.searchSubject$.next(event);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<any>(environments.movies + '?page=0&size=8');
  }

  getMovieById(id: string | null) {
    return this.http.get<any>(environments.movies + '/' + id);
  }
}
