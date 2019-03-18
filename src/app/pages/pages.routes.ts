import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    { path: '', component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
            { path: 'home', component: HomeComponent },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
