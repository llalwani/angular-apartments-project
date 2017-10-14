import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
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
              private router: Router) { }

   login() {
     this.loading = true;
     this._loginService.login(this.model.username, this.model.password).subscribe((response) => {
        console.log('not error' + response);
        this.router.navigate(['/apartments']);
      },
        (error) => {
          console.log('error' + error);
          this.loading = false;
    });
  }

  ngOnInit() {
  }

}
