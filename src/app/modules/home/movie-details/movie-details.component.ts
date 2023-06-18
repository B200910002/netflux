import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscribable, Subscriber } from 'rxjs';
import { MovieService } from 'src/app/core/movie.services';
import { Movie } from 'src/app/core/movies';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  // movie!: Movie;
  movie$!: Observable<Movie>;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService
  ) {}
  subscribe!: any;
  ngOnInit(): void {
    // with resolver
    // this.activatedRoute.data.subscribe((data: any) => {
    //   this.movie = data.movie;
    // });

    // without resolver
    this.subscribe = this.activatedRoute.params.subscribe((params) => {
      this.movie$ = this.movieService.getMovieById(params['id']);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges');
  }
  ngDoCheck(): void {
    // console.log('ngDoCheck');
  }
  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    // console.log('ngAfterViewChecked');
  }
  ngOnDestroy(): void {
    console.log('movie-details onDestroyed');
    this.subscribe.unsubscribe();
  }
  onClickEditButton() {
    this.movie$.subscribe((movie) => {
      this.router.navigate(['movie-id', movie?.id, 'edit']);
    });
  }
}
