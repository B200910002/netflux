import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { MovieService } from 'src/app/core/movie.services';
import { AuthGuard } from 'src/app/auth/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  items!: MenuItem[];
  sortOptions: SelectItem[] = [];
  searchInput = '';
  sortOrder: number = 0;
  sortField: string = '';

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    this.sortOptions = [
      { label: 'Rating High to Low', value: '!imdbRating' },
      { label: 'Rating Low to High', value: 'imdbRating' },
    ];
    this.items = [
      {
        label: 'Catalog',
        items: [
          {
            label: 'Action',
          },
          {
            label: 'Comedy',
          },
          {
            label: 'Horror',
          },
        ],
      },
    ];
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }

    this.movieService.updateMovieState({
      sortField: this.sortField,
      sortOrder: this.sortOrder,
    });
  }

  onFilter(event: Event) {
    this.movieService.searchSubject$.next(this.searchInput);
  }

  onClickSignButton() {
    this.router.navigate([]);
    localStorage.setItem('token', JSON.stringify('testToken123'));
  }

  onClickQuitButton() {
    this.router.navigate(['/']);
    localStorage.removeItem('token');
  }

  isAuth(): boolean {
    return AuthGuard.checkIfUserIsAuthenticated();
  }
}
