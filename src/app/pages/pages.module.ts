import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user.component';
import { BsDatepickerModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PAGES_ROUTES,
    SharedModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    UsersComponent,
    UserComponent
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
