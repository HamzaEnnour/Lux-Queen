import { User } from './../model/user';
import {  HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CastExpr } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  UsersUrl: string = 'http://localhost:3000/users';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  getUsers(): Observable<any>  {
    return this.http.get(this.UsersUrl, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  addUser(user: User): Observable<any> {
    console.log(user);
    return this.http.post(this.UsersUrl, user, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  findbyId(id: number): Observable<any> {
    return this.http.get<any>(this.UsersUrl + '/' + id);
    }

    login(login: string, password: string) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let body = JSON.stringify({login: login,
        password: password});
        var requestOptions = new requestOptions({                    
          headers: headers,
          body: JSON.stringify({login: login,
            password: password})
      })
      return this.http.get<any>(this.UsersUrl ,requestOptions);
    }
    logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
}
