import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard, AdminGuard } from '../services/service.index';
import { UserComponent } from './users/user.component';
import { EmployeesComponent } from './employees/employees.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { ShiftComponent } from './shifts/shift.component';


const pagesRoutes: Routes = [
    { path: '', component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
            { path: 'home', component: HomeComponent },
            { path: 'employees', component: EmployeesComponent, canActivate: [AdminGuard]},
            { path: 'users/:id', component: UserComponent, canActivate: [AdminGuard] },
            { path: 'shifts', component: ShiftsComponent, canActivate: [AdminGuard] },
            { path: 'shifts/:id', component: ShiftComponent, canActivate: [AdminGuard] },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
