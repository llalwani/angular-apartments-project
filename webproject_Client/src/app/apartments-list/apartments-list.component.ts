import { Component, OnInit } from '@angular/core';
import {ApartmentsListServiceService} from "./apartments-list-service.service";
import { IApartment } from './apartment';

@Component({
  selector: 'app-apartments-list',
  templateUrl: './apartments-list.component.html',
  styleUrls: ['./apartments-list.component.css'],
  providers: [ApartmentsListServiceService]

})
export class ApartmentsListComponent implements OnInit {

  apartments: IApartment[];
  constructor(private _apartmentService: ApartmentsListServiceService) { }

    ngOnInit() {
    this.onLoadApartments();
  }

  onLoadApartments(){
    this._apartmentService.getApartments().subscribe(
      (apartments: IApartment[])=> {
          console.log(apartments);
          this.apartments = apartments;
      }, (error)=> {
        console.log(error);
      });
  }

}
