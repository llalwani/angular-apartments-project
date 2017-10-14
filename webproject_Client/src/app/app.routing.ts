import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ApartmentsListComponent} from "./apartments-list/apartments-list.component";
import {ApartmentDetailsComponent} from "./apartment-details/apartment-details.component";
import {AuthGuard} from "./guards/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {AddApartmentComponent} from "./add-apartment/add-apartment.component";
import {MyApartmentsComponent} from "./my-apartments/my-apartments.component";



const appRoutes: Routes = [
  { path: '', redirectTo: 'apartments', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'add-apartment', canActivate: [AuthGuard], component: AddApartmentComponent},
  { path: 'my-apartments', canActivate: [AuthGuard], component: MyApartmentsComponent},
  { path: 'apartments', component: ApartmentsListComponent},
  { path: 'apartments/:id', component: ApartmentDetailsComponent},
  { path: 'register', component: RegisterComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
