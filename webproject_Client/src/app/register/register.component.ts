import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {IUser} from "../shared/user";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../alert/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: IUser = {
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  loading = false;

  constructor(private _authService: AuthService,
              private _router: Router,
              private _alertService: AlertService) {
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this._authService.register(this.model)
    //this._authService.register(this.model.firstName, this.model.lastName, this.model.username, this.model.password)
      .subscribe((response) => {
        this._router.navigate(['/login']);

      }, (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this._alertService.error('Cant register, there is user with the same username');
        }
        if(error.status === 0) {
          this._alertService.error('Failed to connect to server!');

        }
        this.loading = false;
      });
  }
}
