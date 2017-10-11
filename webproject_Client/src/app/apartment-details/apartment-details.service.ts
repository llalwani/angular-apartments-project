import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ApartmentDetailsService {

  public url = 'http://localhost:50743/api/apartments';

  constructor(private _httpClient: HttpClient) { }

  getApartment(id: number): Observable<any> {
    return this._httpClient.get(this.url + '?id='+ id, {
      //  params: params,
      //   headers: new HttpHeaders().set('Content-Type', 'application/x-whww-form-urlencoded; carset=UTF-8'),
    }).map((result: Response) => result);
  }
}
