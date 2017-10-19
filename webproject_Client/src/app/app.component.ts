import {Component} from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {ApartmentsListService} from "./apartments-list/apartments-list-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent {
  currentUser: string;
  constructor(private _authService: AuthService,
              private _apartmentListService: ApartmentsListService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._authService.getObservable().subscribe((result:string) => {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    });
    // Load all apartments list on application start
    // and then save in cache and use it.
    this._apartmentListService.getApartments().subscribe();
  }

  logout() {
    this._authService.logout();
    this.currentUser = undefined;
  }
}
