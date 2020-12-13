import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Wishlist } from '../model/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  WishlistUrl: string = 'http://localhost:3000/wishlist';
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
  getWishlists(): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(this.WishlistUrl, this.httpOptions);
  }
  findWishlistbyId(id: number): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(this.WishlistUrl + '/' + id);
  }
  addWishlist(user: Wishlist): Observable<Wishlist> {
    console.log(user);
    return this.http.post<Wishlist>(this.WishlistUrl, user, this.httpOptions);
  }
  deleteWishlist(id: number): Observable<any> {
    const url = this.WishlistUrl + '/' + id;
    return this.http.delete(url).pipe(
      map(this.extractData),
      catchError(this.handleError));;
    }
}
