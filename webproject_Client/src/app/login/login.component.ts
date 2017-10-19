import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../alert/alert.service";
import {HttpErrorResponse} from "@angular/common/http";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;

  constructor(private _loginService: AuthService,
              private router: Router,
              private _alertService: AlertService) { }

   login() {
     this.loading = true;
     this._loginService.login(this.model.username, this.model.password).subscribe((response) => {
         console.log('not error' + response);
         this.router.navigate(['/apartments']);
       },
       (error: HttpErrorResponse) => {
         if(error.status === 0) {
           this._alertService.error('Failed to connect to server!');

         }
         if (error.status === 400) {
           this._alertService.error('Wrong username or password!');

         }
         this.loading = false;
       });
   }

  ngOnInit() {
  }

}
