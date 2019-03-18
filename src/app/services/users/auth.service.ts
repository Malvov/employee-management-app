import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Auth } from '../../models/auth.model';
import { UserService } from './user.service';
import { SERVICES_URL_V1 } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  token: string;
  employeeId: string;

  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public _userService: UserService
  ) {
    this.getFromStorage();
   }

   isLoggedIn() {
     return (this.token.length > 5) ? true : false;
   }

  getFromStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.employeeId = localStorage.getItem('employeeId');
    } else {
      this.token = '';
      this.user = null;
      this.employeeId = '';
    }
    return { token: this.token, user: this.user };
  }

  setInStorage(token: string, employeeId: string, user: User) {
    localStorage.setItem('employeeId', employeeId);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.token = token;
    this.employeeId = employeeId;
    this.user = user;

  }

  login(auth: Auth) {
    let url = SERVICES_URL_V1 + '/user_token';
    return this.httpClient.post(url, { 'auth': auth }).map(
      (res: any) => {
        this.token = res.jwt;
        this.getUser(res.jwt);
      }
    ).catch(err => {
      console.log('Error ', err.error.messages);
      return throwError(err);
    });
  }

  getUser(token: string) {
    this._userService.getUser(token).subscribe((user: any) => {
      this.setInStorage(token,
        user.relationships.employee.data.id,
        new User(user.attributes.username, user.attributes.email, '', user.attributes.role, user.id));
    });
  }

  logOut() {
    this.token = '';
    this.employeeId = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('employeeId');
    this.router.navigate(['/login']);
  }
}
