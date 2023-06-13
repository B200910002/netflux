import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LoaderService } from './core/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'movie-app';
}
