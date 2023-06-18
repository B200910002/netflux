import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LoaderService } from 'src/app/core/loader.service';
import { MovieService } from 'src/app/core/movie.services';
import { Movie } from 'src/app/core/movies';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  movies$!: Observable<any>;
  movies!: Movie[];
  virtualMovies!: Movie[][];
  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    public loaderService: LoaderService
  ) {
    // this.movies$ = this.movieService.movies$;
  }
  ngOnInit() {
    this.movies = [...this.movieService.movieList];
    this.virtualMovies = Array.from({
      length: Math.floor(this.movieService.totalCount / 4) + 4,
    });
  }

  arrayTo2dArray(data: any[], setSize: number): any[][] {
    const sets: any[][] = [];
    for (let i = 0; i < data.length; i += setSize) {
      sets.push(data.slice(i, i + setSize));
    }
    return sets;
  }

  onLoadLazy(event: any) {
    console.log(event);
    this.movieService
      .getData(Math.floor(event.first / event.rows), event.rows * 4)
      .subscribe((res) => {
        console.log(this.movieService.movieSlice);
        this.virtualMovies.splice(
          event.first,
          event.rows,
          ...this.movieService.movieSlice
        );
        event.forceUpdate();
      });
  }
}
