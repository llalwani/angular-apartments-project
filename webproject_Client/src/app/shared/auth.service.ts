import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Response } from '@angular/http';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
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

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
