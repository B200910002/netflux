import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResolveFn, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieService } from 'src/app/core/movie.services';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { delay } from 'rxjs';
import { MovieListComponent } from './movie-list/movie-list.component';

export const MovieResolver: ResolveFn<any> = (route) => {
  const id = route.paramMap.get('id');
  return inject(MovieService).getMovieById(id);
};

export const MoviesResolver: ResolveFn<any> = () => {
  return inject(MovieService).getMovies();
};

export const MoviesResolver2: ResolveFn<any> = () => {
  return inject(MovieService).getData(0, 16);
};

const routes: Routes = [
  {
    path: '',
    title: 'home',
    // resolve: { movies: MoviesResolver },
    component: HomeComponent,
    // resolve: { movies: MoviesResolver2 },
    // component: MovieListComponent,
  },
  {
    path: 'movie-id/:id',
    title: 'Movie',
    resolve: { movie: MovieResolver },
    children: [
      {
        path: 'edit',
        title: 'Movie edit',
        canActivate: [AuthGuard],
        component: MovieFormComponent,
      },
      {
        path: 'details',
        title: 'Movie details',
        component: MovieDetailsComponent,
      },
    ],
  },
  // {
  //   path: 'edit/:id',
  //   resolve: { movie: MovieResolver },
  //   component: MovieFormComponent,
  // },
  // {
  //   path: 'details/:id',
  //   resolve: { movie: MovieResolver },
  //   component: MovieDetailsComponent,
  // },
];

@NgModule({
  declarations: [
    HomeComponent,
    MovieFormComponent,
    MovieDetailsComponent,
    MovieListComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class HomeModule {}
