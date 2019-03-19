import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (this._userService.isLoggedIn()) {
      return true;
    } else {
      console.log('unauthorized');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
