import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  showLoader(): void {
    this.isLoading.next(true);
  }

  hideLoader(): void {
    this.isLoading.next(false);
  }

  isLoadingState(): BehaviorSubject<boolean> {
    return this.isLoading;
  }
}
