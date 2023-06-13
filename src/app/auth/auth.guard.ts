import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private messageService: MessageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isAuthenticated = AuthGuard.checkIfUserIsAuthenticated();

    if (isAuthenticated) {
      return true; // Allow access to the route
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warn',
        detail: 'Please sign in!',
      });
      // this.router.navigate(['/']); // Redirect to the main page
      return false;
    }
  }
  public static checkIfUserIsAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
