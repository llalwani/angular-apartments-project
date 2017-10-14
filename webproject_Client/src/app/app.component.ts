import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent {
  title = 'Product List App';
  currentUser: string;
  constructor(private _authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._authService.getObservable().subscribe((result:string) => {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    });
  }

  logout() {
    this._authService.logout();
    this.currentUser = undefined;
  }
}
