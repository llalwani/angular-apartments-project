import { Component, OnInit } from '@angular/core';
import {MyApartmentsService} from "./my-apartments.service";
import {IApartment} from "../shared/apartment";
import * as _ from 'lodash'
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../alert/alert.service";

@Component({
  selector: 'app-my-apartments',
  templateUrl: './my-apartments.component.html',
  styleUrls: ['./my-apartments.component.css'],
  providers: [MyApartmentsService]
})
export class MyApartmentsComponent implements OnInit {

  apartments: IApartment[];
  currentUser: string;

  constructor(private _apartmentService: MyApartmentsService,
              private _alertService: AlertService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this._apartmentService.getMyApartments(this.currentUser).subscribe((apartments: IApartment[]) => {
      this.apartments = apartments;
    });
  }

  deleteApartment(id: number) {
    const apartmentResult: IApartment = _.find(this.apartments, function (apartment) {
      return apartment.Id === id;
    });

    if (apartmentResult) {
      this._apartmentService.deleteApartment(apartmentResult.Id).subscribe((result) => {
        console.log(result);
      }, (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this._alertService.error('Bad Request!');
        }
      });
    }
  }
}