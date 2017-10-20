import { Component, OnInit } from '@angular/core';
import {IApartment} from "../shared/apartment";
import {Router} from "@angular/router";
import {AddApartmentService} from "./add-apartment.service";
import {ApartmentsListService} from "../apartments-list/apartments-list-service.service";
import {IMarker} from "../shared/mapsMarker";

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css'],
  providers: [AddApartmentService]
})
export class AddApartmentComponent implements OnInit {
  loading = false;
  lat: number = 32;
  lng: number = 34.9;
  marker: IMarker = {
    lat: 32,
    lng: 34.9
  };
  model: IApartment = {
    Id: 0,
    Address: '',
    Description: '',
    Price: 0,
    Lat: this.marker.lat,
    Lng: this.marker.lng
  };
  constructor(private _router: Router,
              private _addApartmentService: AddApartmentService,
              private _apartmentListService: ApartmentsListService) { }

  ngOnInit() {
  }

  public clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  addApartment() {
    this.loading = true;
    this._addApartmentService.addApartment(this.model)
      .subscribe((addedApartment: IApartment) => {
        this._apartmentListService.addApartment(addedApartment);
        this._router.navigate(['/apartments']);

      }, (error) => {
        this.loading = false;
      });
  }

  mapClicked($event: any) {
    this.marker.lat =$event.coords.lat;
    this.marker.lng = $event.coords.lng;
    this.model.Lat = $event.coords.lat;
    this.model.Lng = $event.coords.lng;
  }

}
