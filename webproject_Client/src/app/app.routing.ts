import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ApartmentsListComponent} from "./apartments-list/apartments-list.component";
import {ApartmentDetailsComponent} from "./apartment-details/apartment-details.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {AddApartmentComponent} from "./add-apartment/add-apartment.component";



const appRoutes: Routes = [
  { path: '', redirectTo: 'apartments', canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'add-apartment', component: AddApartmentComponent},
  { path: 'apartments', canActivate: [AuthGuard], component: ApartmentsListComponent},
  { path: 'apartments/:id', component: ApartmentDetailsComponent},
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
