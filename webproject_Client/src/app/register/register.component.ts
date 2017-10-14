import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {IUser} from "../shared/user";

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
              private _router: Router) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this._authService.register(this.model)
    //this._authService.register(this.model.firstName, this.model.lastName, this.model.username, this.model.password)
      .subscribe((response) => {
        this._router.navigate(['/login']);

      }, (error) => {
        this.loading = false;
      });
  }
}
