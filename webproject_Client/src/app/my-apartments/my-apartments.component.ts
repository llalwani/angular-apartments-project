import { Component, OnInit } from '@angular/core';
import {MyApartmentsService} from "./my-apartments.service";
import {IApartment} from "../shared/apartment";

@Component({
  selector: 'app-my-apartments',
  templateUrl: './my-apartments.component.html',
  styleUrls: ['./my-apartments.component.css'],
  providers: [MyApartmentsService]
})
export class MyApartmentsComponent implements OnInit {

  apartments: IApartment[];
  currentUser: string;
  constructor(private _apartmentService: MyApartmentsService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this._apartmentService.getMyApartments(this.currentUser).subscribe((apartments: IApartment[]) => {
      this.apartments = apartments;
    });
  }

  deleteApartment(id: number) {

  }

}
