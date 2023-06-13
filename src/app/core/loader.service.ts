import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  showLoader(): void {
    this.isLoading.next(true);
    // Logic to show the loader in your UI
  }

  hideLoader(): void {
    this.isLoading.next(false);
    // Logic to hide the loader in your UI
  }

  isLoadingState(): BehaviorSubject<boolean> {
    return this.isLoading;
  }
}
