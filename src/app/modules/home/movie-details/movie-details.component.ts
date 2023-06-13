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
import { MessageService } from 'primeng/api';
import { MovieService } from 'src/app/core/movie.services';
import { Movie } from 'src/app/core/movies';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  providers: [MessageService],
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
  movie: Movie | undefined;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.movie = data.movie;
    });
    console.log(this.movie);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
  onClickEditButton() {
    this.router.navigate(['movie-id', this.movie?.id, 'edit']);
  }
}
