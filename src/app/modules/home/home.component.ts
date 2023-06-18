import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, Subscriber } from 'rxjs';
import { LoaderService } from 'src/app/core/loader.service';

import { MovieService } from 'src/app/core/movie.services';
import { Movie } from 'src/app/core/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [''],
})
export class HomeComponent {
  subscribe!: any;

  @ViewChild('dataView') dataView: any;
  movies: Movie[] = [];
  movies$!: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    public loaderService: LoaderService
  ) {
    this.movies$ = this.movieService.movies$;
  }

  ngOnInit() {
    // turn on resolver so route has be data
    // this.activatedRoute.data.subscribe((data: any) => {
    //   this.movies = data.movies;
    // });
    // this.movieService.searchSubject$.subscribe((search: any) => {
    //   this.dataView?.filter(search);
    // });
  }

  ngOnDestroy() {
    console.log('home onDestroyed');
  }

  next(event: any) {
    this.movieService.updateMovieState({
      page: Math.floor(event.first / event.rows),
      rows: event.rows,
      sortField: event.sortField,
      sortOrder: event.sortOrder,
    });
  }
}
