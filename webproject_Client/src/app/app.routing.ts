import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ApartmentsListComponent} from "./apartments-list/apartments-list.component";
import {ApartmentDetailsComponent} from "./apartment-details/apartment-details.component";
import {AuthGuard} from "./guards/auth.guard";



const appRoutes: Routes = [
  { path: '', redirectTo: 'apartments', canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'apartments', canActivate: [AuthGuard], component: ApartmentsListComponent},
  { path: 'apartments/:id', component: ApartmentDetailsComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
