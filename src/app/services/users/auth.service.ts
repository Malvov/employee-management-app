import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Auth } from '../../models/auth.model';
import { SERVICES_URL_V1 } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  token: string;

  constructor(
    public httpClient: HttpClient,
    public router: Router
  ) {
    this.getFromStorage();
   }

   isLoggedIn() {
     return (this.token.length > 5) ? true : false;
   }

  getFromStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
    return { token: this.token };
  }

  setInStorage(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  login(auth: Auth) {
    let url = SERVICES_URL_V1 + '/user_token';
    return this.httpClient.post(url, { 'auth': auth }).map(
      (res: any) => {
        this.setInStorage(res.jwt);
        console.log('logged in');
        return true;
      }
    ).catch(err => {
      console.log('Error ', err.error.messages);
      return throwError(err);
    });
  }

  logOut() {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
