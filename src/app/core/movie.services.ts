import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  switchMap,
  tap,
} from 'rxjs';

import { Movie } from './movies';
import { environments } from 'src/environment/environment';

export interface MovieState {
  page: number;
  rows: number;
  sortField: string;
  sortOrder: number;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movieList: Movie[] = [];
  movieSlice: Movie[][] = [];
  totalCount = 0;
  private _movieState = new BehaviorSubject<MovieState>({
    page: 0,
    rows: 16,
    sortField: 'imdbRating',
    sortOrder: -1,
  });

  movieState$ = this._movieState.asObservable();

  movies$ = this.movieState$.pipe(
    switchMap((state) =>
      this.http.get<Movie[]>(
        `${environments.movies}?page=${state.page}&size=${state.rows}&sort=${
          state.sortField
        },${
          state.sortOrder === -1 ? 'desc' : state.sortOrder === 1 ? 'asc' : ''
        }`,
        { observe: 'response' }
      )
    ),
    map((res: HttpResponse<Movie[]>) => {
      const total = res.headers?.get('X-Total-Count');
      this.totalCount = total ? +total : 0;
      this.movieList.push(...(res.body as Movie[]));
      console.log(this.movieList);
      this.movieSlice = this.arrayTo2dArray(res.body as Movie[], 4);
      return {
        data: this.movieList,
        totalRecords: total ? +total : 0,
        sortOrder: this._movieState.value.sortOrder,
        sortField: this._movieState.value.sortField,
      };
    })
  );

  sortSubject$: Subject<any> = new Subject();
  searchSubject$: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  updateMovieState(state: Partial<MovieState>) {
    this._movieState.next({ ...this._movieState.value, ...state });
  }

  onSort(event: any) {
    this.sortSubject$.next(event);
  }

  onSearch(event: any) {
    this.searchSubject$.next(event);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<any>(environments.movies + '?page=0&size=8');
  }

  getMovieById(id: string | null): Observable<Movie> {
    return this.http.get<any>(environments.movies + '/' + id);
  }

  putMovie(id: string | null, data: Movie): Observable<Movie> {
    return this.http.put<Movie>(environments.movies + '/' + id, data);
  }

  getData(page: number, pageSize: number) {
    return this.http
      .get<Movie[]>(
        `${
          environments.movies
        }?page=${page}&size=${pageSize}&sort=${'imdbRating'},${
          true ? 'desc' : 'asc'
        }`,
        { observe: 'response' }
      )
      .pipe(
        tap((res: HttpResponse<Movie[]>) => {
          const total = res.headers?.get('X-Total-Count');
          this.totalCount = total ? +total : 0;
          this.movieSlice = this.arrayTo2dArray(res.body as Movie[], 4);
        })
      );
  }

  arrayTo2dArray(data: any[], setSize: number): any[][] {
    const sets: any[][] = [];
    for (let i = 0; i < data.length; i += setSize) {
      sets.push(data.slice(i, i + setSize));
    }
    return sets;
  }
}
