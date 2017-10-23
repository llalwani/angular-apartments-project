import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import {IApartment} from "../shared/apartment";
import * as _ from "lodash";
import {IApartmentWithUser} from "../shared/apartmentWithUser";

@Injectable()
export class AddApartmentService {
  public url  = environment.apiUrl + 'apartments';
  public currentUser: string;
  constructor(private _httpClient: HttpClient,
              private router: Router) { }



  addApartment(model: IApartment, image: File) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let imageForm = new FormData();
    imageForm.append('image', image);
    imageForm.append('username', this.currentUser);
    imageForm.append('apartment', JSON.stringify(_.cloneDeep(model)));
    let newModel: any = {
      username: this.currentUser,
      apartment: _.cloneDeep(model),
      image: image
    };
    return this._httpClient.post(this.url, imageForm)
      .map((result: IApartment) => {
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
    return Observable.throw(errorMessage);
  }
}
