import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [
    NavbarComponent,
    PageNotFoundComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
