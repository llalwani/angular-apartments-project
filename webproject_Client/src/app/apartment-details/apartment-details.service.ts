import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApartmentsListService} from "../apartments-list/apartments-list-service.service";
import { IApartment } from '../shared/apartment';
import * as _ from "lodash";

@Injectable()
export class ApartmentDetailsService {

  public url = environment.apiUrl + 'apartments';

  private dummyApartment: IApartment = {
    Id: 0,
    Address: '',
    Description: '',
    Price: 0,
    Lat: 0,
    Lng: 0
  };
  constructor(private _httpClient: HttpClient,
              private _aparmentListService: ApartmentsListService) { }

  getApartment(id: number): Observable<IApartment> {
  //  if(this._aparmentListService.apartments && this._aparmentListService.apartments.length > 0)

    this._aparmentListService.getApartments().subscribe((apartments: IApartment[]) => {
        const resultApartment = _.filter(apartments, function(o) {
          return o.Id === id;
        });
        this.dummyApartment.Id = resultApartment[0].Id;
      this.dummyApartment.Price = resultApartment[0].Price;
      this.dummyApartment.Description = resultApartment[0].Description;
      this.dummyApartment.Address = resultApartment[0].Address;
      this.dummyApartment.Lat = resultApartment[0].Lat;
      this.dummyApartment.Lng = resultApartment[0].Lng;

      return Observable.of(this.dummyApartment);
    });
    return Observable.of(this.dummyApartment);
    // return this._httpClient.get(this.url + '?id='+ id, {
    //   //  params: params,
    //   //   headers: new HttpHeaders().set('Content-Type', 'application/x-whww-form-urlencoded; carset=UTF-8'),
    // }).map((result: Response) => result).catch(this.handleError);
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
}
