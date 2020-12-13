import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  CartsUrl: string = 'http://localhost:3000/cart';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }
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
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.CartsUrl, this.httpOptions);
  }
  addCart(user: Cart): Observable<Cart> {
    console.log(user);
    return this.http.post<Cart>(this.CartsUrl, user, this.httpOptions);
  }
  deleteCart(id: number): Observable<any> {
    const url = this.CartsUrl + '/' + id;
    return this.http.delete(url).pipe(
      map(this.extractData),
      catchError(this.handleError));;
    }
}
