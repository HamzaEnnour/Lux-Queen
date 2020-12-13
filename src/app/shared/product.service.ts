import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ProductsUrl: string = 'http://localhost:3000/products';
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
  findProductbyId(id: number): Observable<Product> {
    return this.http.get<Product>(this.ProductsUrl + '/' + id);
  }
  findProductbyAllCritere(all: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.ProductsUrl + '/?q=' + all);
  }

  SortProductsByPrice(type: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.ProductsUrl + '/?_sort=price&_order='+type);
  }

  getProducts(): Observable<any> {
    return this.http.get(this.ProductsUrl, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}
