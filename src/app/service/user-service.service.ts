import { User } from './../model/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CastExpr } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  UsersUrl: string = 'http://localhost:3000/users';
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
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.UsersUrl, this.httpOptions);
  }
  addUser(user: User): Observable<User> {
    console.log(user);
    return this.http.post<User>(this.UsersUrl, user, this.httpOptions);
  }
  findbyId(id: number): Observable<User> {
    return this.http.get<User>(this.UsersUrl + '/' + id);
  }
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.UsersUrl + '/' + id, user, this.httpOptions);
    }
  login(login: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.UsersUrl}/?login=${login}&password=${password}`);
  }

  logout() {
    localStorage.removeItem('CurrentUser');
  }
  isLoggedin(): boolean {
    var user = JSON.parse(localStorage.getItem('CurrentUser'));
    if (user!=null) {
      return true;
    }
    else
      return false;
  }

}
