import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;
  isValidLogin: boolean = true;
  constructor(private _loginService: LoginService,
              private router: Router) { }

   performLogin() {
    this._loginService.login(this.username, this.password).subscribe((response) => {
        console.log('not error' + response);
        this.router.navigate(['/apartments']);
      },
        (error) => {
          console.log('error' + error);
          this.isValidLogin = false;

    });
  }

  ngOnInit() {
  }

}
