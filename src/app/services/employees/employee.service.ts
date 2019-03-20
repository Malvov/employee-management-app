import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { Employee } from '../../models/employee.model';
import { SERVICES_URL_V1 } from 'src/app/config/config';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  token: string;

  constructor(
    public _userService: UserService,
    public httpClient: HttpClient,
    public router: Router
  ) { this.token = this._userService.getFromStorage().token; }

  getEmployee(employeeId: string) {
    let url = SERVICES_URL_V1 + '/employees/' + employeeId;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.httpClient.get(url, { headers: headers }).map((res: any) => res.data).catch(err => {
      swal(err.error.message, err.error.errors.message, 'error');
      return throwError(err);
    });
  }

  getEmployees() {
    let url = SERVICES_URL_V1 + '/employees';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.httpClient.get(url, { headers: headers }).map((res: any) => res.data).catch(err => {
      swal(err.error.message, err.error.errors.message, 'error');
      return throwError(err);
    });
  }
}
