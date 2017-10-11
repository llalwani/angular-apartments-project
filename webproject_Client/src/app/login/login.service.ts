import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Response } from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
@Injectable()
export class LoginService {

  public url = 'http://localhost:50743/api/authentication';
  constructor(private _httpClient: HttpClient) { }


  login(username: string, password: string): Observable<any> {
    let params = new HttpParams();
    params.append('username', username);
    params.append('password', password);
  //  let httpheaders = new HttpHeaders();
  //  httpheaders.set('Content-Type', 'application/json');
  //  httpheaders.set('Accept','*/*');
    return this._httpClient.get(this.url + '?username='+ username + '&password='+password, {
    //  params: params,
   //   headers: new HttpHeaders().set('Content-Type', 'application/x-whww-form-urlencoded; carset=UTF-8'),
    }).map((result: Response) => result.json());
  }
}
