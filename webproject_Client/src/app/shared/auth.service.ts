import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Response } from '@angular/http';
  import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {IUser} from "../register/user";
@Injectable()
export class AuthService {

  public url = 'http://localhost:50743/api/authentication';
  constructor(private _httpClient: HttpClient,
              private router: Router) { }


  login(username: string, password: string): Observable<any> {
  //  let httpheaders = new HttpHeaders();
  //  httpheaders.set('Content-Type', 'application/json');
  //  httpheaders.set('Accept','*/*');
    return this._httpClient.get(this.url + '?username='+ username + '&password='+password, {
    //  params: params,
   //   headers: new HttpHeaders().set('Content-Type', 'application/x-whww-form-urlencoded; carset=UTF-8'),
    }).map((result: Response) => {
      let user = result;
      if(result) {
        localStorage.setItem('currentUser',JSON.stringify(user));
      }
    });
  }

  // register(firstName: string, lastName: string, username: string, password: string) {
  //   let params = new HttpParams();
  //   params.set('FirstName', firstName);
  //   params.set('LastName', lastName);
  //   params.set('Username', username);
  //   params.set('Password', password);
  //   return this._httpClient.post(this.url, {
  //      params: params,
  //   }).map((result: Response) => {
  //     return result;
  //   });
  // }

  register(model: IUser) {
    let params = new HttpParams();
    params.set('user', JSON.stringify(model));
    return this._httpClient.post(this.url, model)
    .map((result: Response) => {
      return result;
    });
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
