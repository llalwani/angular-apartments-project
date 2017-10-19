import { Component, OnInit } from '@angular/core';
import {MyApartmentsService} from "./my-apartments.service";
import {IApartment} from "../shared/apartment";
import * as _ from 'lodash'
import {HttpErrorResponse} from "@angular/common/http";
import {AlertService} from "../alert/alert.service";
import {ApartmentsListService} from "../apartments-list/apartments-list-service.service";

@Component({
  selector: 'app-my-apartments',
  templateUrl: './my-apartments.component.html',
  styleUrls: ['./my-apartments.component.css'],
  providers: []
})
export class MyApartmentsComponent implements OnInit {

  apartments: IApartment[];
  currentUser: string;

  constructor(private _apartmentService: MyApartmentsService,
              private _alertService: AlertService,
              private _apartmentListService: ApartmentsListService) {
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
        const isDeletedFromMyApartments: any = _.remove(this.apartments, function (o) {
          return o.Id === apartmentResult.Id;
        });

        if(isDeletedFromMyApartments) {
          this._apartmentListService.deleteApartmentFromLocalArray(apartmentResult);

        }
      }, (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this._alertService.error('Bad Request!');
        }
      });
    }
  }
}
