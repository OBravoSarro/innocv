import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()

export class RestService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient)
  {

  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public get(path:string):Observable<any> {
    return this.http.get(environment.apiPath + path).pipe(
      map(this.extractData)
    );
  }

  public post(path:string, data:any):Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.apiPath + path, JSON.stringify(data), this.httpOptions).pipe(
      tap((data) => console.log(`Vuelve del post`), data),
      catchError(this.handleError<any>('postCall'))
    );
  }

  public put (path:string, data:any):Observable<any> {
    return this.http.put(environment.apiPath + path, JSON.stringify(data), this.httpOptions).pipe(
      tap((data) => console.log(`Vuelve del post`), data),
      catchError(this.handleError<any>('putCall'))
    );
  }

  public delete (path:string, data:any):Observable<any> {
    return this.http.delete<any>(environment.apiPath + path, this.httpOptions).pipe(
      tap((data) => console.log(`Vuelve del post`), data),
      catchError(this.handleError<any>('deleteCall'))
    );
  }

}
