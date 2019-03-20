import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Auth } from '../../models/auth.model';
import { Employee } from '../../models/employee.model';
import { SERVICES_URL_V1 } from 'src/app/config/config';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;
  employeeId: string;
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
        this.getUser('login').subscribe((user: any) => {
          this.setInStorage(this.token, user.relationships.employee.data.id, 
            new User(user.attributes.username, user.attributes.email, '', user.attributes.role, user.id)
            );
            swal('Bienvenido', user.attributes.username, 'success');
            return true;
        });
      }
    ).catch(err => {
      console.log('Error ', err.error.messages);
      return throwError(err);
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

  getUser(userId: string) {
    let url = SERVICES_URL_V1 + '/users/' + userId;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.httpClient.get(url, { headers: headers }).map((res: any) => res.data).catch(err => {
      swal(err.error.message, err.error.errors.message, 'error');
      return throwError(err);
    });
  }

  createUser(user: User, employee: Employee) {
    let url = SERVICES_URL_V1 + '/users';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    let userPost = {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      employee_attributes: {
        first_name: employee.firstName,
        last_name: employee.lastName,
        entry_date: employee.entryDate,
        active: employee.active
      }
    };
    return this.httpClient.post(url, { 'user': userPost }, { headers: headers }).map((res: any) => {
      swal('User created', 'success');
      return res.data;
    }).catch(err => {
        swal(err.error.message, err.error.errors.message, 'error');
        return throwError(err);
    });
  }

  updateUser(user: User, employee: Employee) {
    let url = SERVICES_URL_V1 + '/users/' + user.id;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    let userPost = {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      employee_attributes: {
        first_name: employee.firstName,
        last_name: employee.lastName,
        entry_date: employee.entryDate,
        active: employee.active,
        id: employee.id
      }
    };
    console.log(user.id);
    console.log(userPost);
    console.log(url);
    return this.httpClient.put(url, { 'user': userPost }, { headers: headers }).map((res: any) => {
      swal('User updated', 'success');
      return res.data;
    }).catch(err => {
      swal(err.error.message, err.error.errors.message, 'error');
      return throwError(err);
    });
  }

  getEmployee(employeeId: string) {
    let url = SERVICES_URL_V1 + '/employees/' + employeeId;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.httpClient.get(url, { headers: headers }).map((res: any) => {
      return res.data;
    }).catch(err => {
      swal(err.error.message, err.error.errors.message, 'error');
      return throwError(err);
    });
  }
}
