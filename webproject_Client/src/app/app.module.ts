import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import { AlertModule } from 'ngx-bootstrap';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ApartmentsListComponent } from './apartments-list/apartments-list.component';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';

import {routing} from './app.routing'
import {AuthGuard} from "./guards/auth.guard";
import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApartmentsListComponent,
    ApartmentDetailsComponent,
    RegisterComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
