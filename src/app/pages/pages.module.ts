import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user.component';
import { EmployeesComponent } from './employees/employees.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { ShiftComponent } from './shifts/shift.component';

import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PAGES_ROUTES,
    SharedModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    UserComponent,
    EmployeesComponent,
    ShiftsComponent,
    ShiftComponent
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
