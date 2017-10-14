import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {IApartment} from "../shared/apartment";

@Injectable()
export class MyApartmentsService {

  private url = environment.apiUrl + 'myapartments';

  constructor(private _httpClient: HttpClient) {
  }


  getMyApartments(username: string) {
    return this._httpClient.get(this.url + '?username=' + username)
      .map((result: IApartment[]) => {
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
