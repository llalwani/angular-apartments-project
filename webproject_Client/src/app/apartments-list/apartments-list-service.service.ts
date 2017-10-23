import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { IApartment } from '../shared/apartment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
import {environment} from "../../environments/environment";
import * as _ from 'lodash'
import {AlertService} from "../alert/alert.service";

@Injectable()
export class ApartmentsListService {
  public url  = environment.apiUrl + 'apartments';
  public apartments: IApartment[];

  constructor(private _httpClient: HttpClient,
              private _alertService: AlertService) {
  }

  public addApartment(apartment: IApartment) {
    this.apartments.push(apartment);
  }
  public getApartments(): Observable<IApartment[]> {
    if (this.apartments && this.apartments.length > 0) {
      return Observable.of(this.apartments);
    }
    return this._httpClient.get(this.url).map((result: IApartment[]) => {
      this.apartments = result;
      return result;
    }).catch(this.handleError);
  }

  public deleteApartmentFromLocalArray(apartment: IApartment) {
    if(!apartment) {
      return;
    }

    const isDeletedFromApartmentsList = _.remove(this.apartments, function (o) {
      return o.Id === apartment.Id;
    });
    if(!isDeletedFromApartmentsList) {
      this._alertService.error('apartment cannot be found in order to be deleted');
      return;
    }
    this._alertService.success('apartment deleted sucessfully');

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
    return Observable.throw(err);
  }
}
