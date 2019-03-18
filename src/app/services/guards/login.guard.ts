import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../users/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public _authService: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    } else {
      console.log('unauthorized');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
