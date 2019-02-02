import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  public getUsers():Observable<any> {
    return this.http.get(environment.apiPath + 'User').pipe(
      map(this.extractData)
    );
  }

  public getUser(id:number):Observable<User> {
    return this.http.get(environment.apiPath + 'user/'+id).pipe(
      map(this.extractData)
    );
  }

  public newUser(data:any):Observable<any> {
    console.log(data);
    return this.http.post<any>(environment.apiPath + 'user', JSON.stringify(data), this.httpOptions).pipe(
      tap((data) => console.log(`post`), data),
      catchError(this.handleError<any>('postCall'))
    );
  }

  public updateUser (data:any):Observable<any> {
    return this.http.put(environment.apiPath + 'user', JSON.stringify(data), this.httpOptions).pipe(
      tap((data) => console.log(`put`), data),
      catchError(this.handleError<any>('putCall'))
    );
  }

  public deleteUser (id:number):Observable<any> {
    return this.http.delete<any>(environment.apiPath + 'user/' + id, this.httpOptions).pipe(
      tap((data) => console.log(`delete`)),
      catchError(this.handleError<any>('deleteCall'))
    );
  }

}
