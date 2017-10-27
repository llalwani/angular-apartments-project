import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { HttpErrorResponse} from "@angular/common/http";
import {ApartmentsListService} from "../apartments-list/apartments-list-service.service";
import { IApartment } from '../shared/apartment';
import * as _ from "lodash";

@Injectable()
export class ApartmentDetailsService {

  private dummyApartment: IApartment = this.getEmptyModel();
  constructor(private _aparmentListService: ApartmentsListService) { }

  getApartment(id: number): Observable<IApartment> {
    this._aparmentListService.getApartments().subscribe((apartments: IApartment[]) => {
        const resultApartment = _.filter(apartments, function(o) {
          return o.Id === id;
        });

      //  _.cloneDeep(this.dummyApartment,resultApartment[0]);
        this.dummyApartment.Id = resultApartment[0].Id;
      this.dummyApartment.Price = resultApartment[0].Price;
      this.dummyApartment.Description = resultApartment[0].Description;
      this.dummyApartment.Address = resultApartment[0].Address;
      this.dummyApartment.Lat = resultApartment[0].Lat;
      this.dummyApartment.Lng = resultApartment[0].Lng;
      this.dummyApartment.RoomsNumber = resultApartment[0].RoomsNumber;
      this.dummyApartment.apartmentSize = resultApartment[0].ApartmentSize;
      this.dummyApartment.hasAirConditining = resultApartment[0].hasAirConditining;
      this.dummyApartment.hasFurniture = resultApartment[0].hasFurniture;
      this.dummyApartment.hasParking = resultApartment[0].hasParking;
      this.dummyApartment.Images = _.cloneDeep(resultApartment[0].Images);
      this.dummyApartment.User = _.cloneDeep(resultApartment[0].User);
      return Observable.of(this.dummyApartment);
    });
    return Observable.of(this.dummyApartment);
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

  private getEmptyModel(): IApartment {
    return {
      Id: 0,
      Address: '',
      Description: '',
      Price: 0,
      Lat: 0,
      Lng: 0,
      RoomsNumber: 0,
      apartmentSize: 0,
      hasParking: false,
      hasAirConditining: false,
      hasFurniture: false,
      Images: []
    };
  }
}
