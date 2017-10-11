import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { IApartment } from './apartment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class ApartmentsListServiceService {
  public url = 'http://localhost:50743/api/apartments';
  constructor(private _httpClient: HttpClient) {
  }


  public getApartments(): Observable<any> {

  //  let httpheaders = new HttpHeaders();
  //  httpheaders.set('Content-Type', 'application/json');
  //  httpheaders.set('Accept','*/*');
  return this._httpClient.get(this.url, {
  //  params: params,
  //   headers: new HttpHeaders().set('Content-Type', 'application/x-whww-form-urlencoded; carset=UTF-8'),
}).map((result: IApartment[]) => {
    const data = result;
    return data;
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
    return Observable.throw(errorMessage);
  }
}
