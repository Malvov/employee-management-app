import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class UserService {

  user: User;
  constructor(
    public httpClient: HttpClient
  ) { }

  getUser(token: string) {
    let url = SERVICES_URL_V1 + '/user';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.httpClient.get(url, { headers: headers }).map((res: any) => res.data);
  }
}
