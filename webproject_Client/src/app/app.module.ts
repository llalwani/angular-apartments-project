import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertModule } from 'ngx-bootstrap';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ApartmentsListComponent } from './apartments-list/apartments-list.component';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';

import {routing} from './app.routing'
import {AuthGuard} from "./guards/auth.guard";
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./shared/auth.service";
import { AddApartmentComponent } from './add-apartment/add-apartment.component';
import {ApartmentsListService} from "./apartments-list/apartments-list-service.service";
import { AlertComponent } from './alert/alert.component';
import {AlertService} from "./alert/alert.service";
import { MyApartmentsComponent } from './my-apartments/my-apartments.component';
import {MatProgressBarModule} from '@angular/material';
import {MyApartmentsService} from "./my-apartments/my-apartments.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApartmentsListComponent,
    ApartmentDetailsComponent,
    RegisterComponent,
    AddApartmentComponent,
    AlertComponent,
    MyApartmentsComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [AuthGuard,
              AuthService,
              MyApartmentsService,
              ApartmentsListService,
              AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
