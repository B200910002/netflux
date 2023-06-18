import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/core/movies';
import { movieEntity } from './movie.entity';
import { MovieService } from 'src/app/core/movie.services';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styles: [],
})
export class MovieFormComponent {
  movieForm: FormGroup;
  isNew = true;
  movieEntity = movieEntity;
  controlNames: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private movieService: MovieService
  ) {
    let formControls = Object.keys(movieEntity).reduce((acc: any, key) => {
      acc[key] = [''];
      return acc;
    }, {});

    this.movieForm = this.fb.group(formControls);
    this.controlNames = Object.keys(movieEntity);

    console.log(this.movieForm.value);
    this.movieForm.valueChanges.pipe();

    this.activatedRoute.data.subscribe((data: any) => {
      this.setFormValues(data.movie);
    });
  }

  setFormValues(movie: Movie) {
    this.isNew = movie ? false : true;
    this.movieForm.patchValue(movie);
  }

  onSubmit() {
    if (this.movieForm.valid) {
      if (window.confirm('Are you sure?')) {
        this.movieService
          .putMovie(this.movieForm.value.id, this.movieForm.value)
          .subscribe(() => {
            alert('Successfuly edit movie');
          });
      } else {
        alert('something wrong');
      }
    }
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      console.log(data, 'here');
    });
  }
}
