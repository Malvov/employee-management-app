import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  LoginGuard,
  UserService,
  EmployeeService,
  ShiftService
} from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    LoginGuard,
    UserService,
    EmployeeService,
    ShiftService
  ]
})
export class ServiceModule { }
