import { Comment } from '../model/comment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  CommentsUrl: string = 'http://localhost:3000/comment';
  constructor(private http: HttpClient) { }
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
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  addComment(com: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.CommentsUrl, com, this.httpOptions);
  }

  getComments(): Observable<any> {
    return this.http.get(this.CommentsUrl, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  deleteComment(id: number): Observable<any> {
    const url = this.CommentsUrl + '/' + id;
    return this.http.delete(url).pipe(
      map(this.extractData),
      catchError(this.handleError));;
    }
}
