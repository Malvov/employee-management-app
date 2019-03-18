import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  AuthService,
  LoginGuard,
  UserService,
  EmployeeService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    AuthService,
    LoginGuard,
    UserService,
    EmployeeService
  ]
})
export class ServiceModule { }
