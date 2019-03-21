import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ) {}

  canActivate() {
    if (this._userService.user.role === 'admin') {
      return true;
    } else {
      console.log('blocked');
      this.router.navigate(['/login']);
      this._userService.logOut();
      return false;
    }
  }
}
