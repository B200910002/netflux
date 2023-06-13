import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieService } from 'src/app/core/movie.services';
import { Movie } from 'src/app/core/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [''],
})
export class HomeComponent {
  @ViewChild('dataView') dataView: any;
  movies: Movie[] = [];
  movies$!: Observable<any>;

  sortOrder: number = -1;
  sortField: string = 'imdbRating';

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {
    this.movies$ = this.movieService.getMovies();
    this.movieService = movieService;
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.movies = data.movies;
    });
    this.movieService.sortSubject$.subscribe((movieOrder: any) => {
      this.sortField = movieOrder.sortField;
      this.sortOrder = movieOrder.sortOrder;
    });
    this.movieService.searchSubject$.subscribe((search: any) => {
      this.dataView?.filter(search);
    });
    // this.movieService.getMovies().subscribe((movies) => {
    //   this.movies = movies;
    // });
  }
}
