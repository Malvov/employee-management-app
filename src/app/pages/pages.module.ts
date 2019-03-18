import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PAGES_ROUTES } from './pages.routes';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PAGES_ROUTES
  ],
  declarations: [
    PagesComponent,
    HomeComponent
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
