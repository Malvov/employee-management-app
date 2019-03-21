import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Shift } from '../../models/shift.model';
import { UserService } from '../users/user.service';
import { SERVICES_URL_V1 } from 'src/app/config/config';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class ShiftService {

  token: string;
  constructor(
    public _userService: UserService,
    public router: Router,
    public httpClient: HttpClient
  ) { this.token = this._userService.getFromStorage().token; }

  getShifts() {
    let url = SERVICES_URL_V1 + '/shifts';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.httpClient.get(url, { headers: headers }).map((res: any) => res.data).catch(err => {
      return throwError(err);
    });
  }

  getShift(shiftId: string) {
    let url = SERVICES_URL_V1 + '/shifts/' + shiftId;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.httpClient.get(url, { headers: headers }).map((res: any) => res.data).catch(err => {
      return throwError(err);
    });
  }

  createShift(shift: Shift) {
    let url = SERVICES_URL_V1 + '/shifts';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.httpClient.post(url, { 'shift': shift }, { headers: headers }).map((res: any) => {
      swal('Shift created', 'success');
      return res.data;
    }).catch(err => {
      swal('Something went wrong', 'info');
      return throwError(err);
    });
  }

  updateShift(shift: Shift) {
    let url = SERVICES_URL_V1 + '/shifts/' + shift.id;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.httpClient.put(url, { 'shift': shift }, { headers: headers }).map((res: any) => {
      swal('Shift updated', 'success');
      return res.data;
    }).catch(err => {
      swal('Something went wrong', 'info');
      return throwError(err);
    });
  }

  destroyShift(shiftId: string) {
    let url = SERVICES_URL_V1 + '/shifts/' + shiftId;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });

    return this.httpClient.delete(url, { headers: headers }).map((res: any) => {
      swal('Shift deleted', 'success');
      return true;
    }).catch(err => {
      return throwError(err);
    })
  }
}
