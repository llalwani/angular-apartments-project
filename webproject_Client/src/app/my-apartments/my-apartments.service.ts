import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {IApartment} from "../shared/apartment";

@Injectable()
export class MyApartmentsService {

  private myApartmentsUrl = environment.apiUrl + 'myapartments';
  private apartmentsUrl = environment.apiUrl + 'apartments';
  apartments: IApartment[];

  constructor(private _httpClient: HttpClient) {
  }


  getMyApartments(username: string) {
    if (this.apartments && this.apartments.length > 0) {
      return Observable.of(this.apartments);
    }
    return this._httpClient.get(this.myApartmentsUrl + '?username=' + username)
      .map((result: IApartment[]) => {
      this.apartments = result;
        return result;
      }).catch(this.handleError);
  }

  deleteApartment(id: number) {
    return this._httpClient.delete(this.apartmentsUrl + '?id='+ id)
      .map((result: Response) => {
        return result;
      }).catch(this.handleError);
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
