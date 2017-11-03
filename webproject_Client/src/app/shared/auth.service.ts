import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Response } from '@angular/http';
  import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {IUser} from "./user";
import {Subject} from "rxjs/Subject";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {

  private subject = new Subject<string>();
  public url  = environment.apiUrl + 'authentication';
  constructor(private _httpClient: HttpClient,
              private router: Router) { }


  login(username: string, password: string): Observable<any> {
    return this._httpClient.get(this.url +'?username='+ username + '&password='+password, {
    }).map((result: Response) => {
      let user = result;
      if(result) {
        localStorage.setItem('currentUser',JSON.stringify(user));
        // update app.component component with the new user
        this.subject.next(JSON.stringify(user));
      }
    }).catch(this.handleError);
  }

  register(model: IUser) {
    return this._httpClient.post(this.url, model)
    .map((result: Response) => {
      return result;
    }).catch(this.handleError);
  }

  getObservable(): Observable<string> {
    return this.subject.asObservable();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
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
