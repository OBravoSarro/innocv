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

  private handleError<T> (operation = 'operation', result?:any) {
    return (error: any): Observable<T> => {

      // console.error(error);
      // console.error(error.status);
      // console.error(`${operation} failed: ${error.message}`);
      let errMsg = {error: true, errorStatus: error.status};
      //console.error(errMsg);

      return of(errMsg as any);
    };

  }

  public getUsers():Observable<any> {
    return this.http.get(environment.apiPath + 'User').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getUsers'))
    );
  }

  public getUser(id:number):Observable<any> {
    return this.http.get(environment.apiPath + 'user/'+id).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getUser'))
    );
  }

  public newUser(data:any):Observable<any> {
    return this.http.post<any>(environment.apiPath + 'user', JSON.stringify(data), this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('newUser'))
    );
  }

  public updateUser (data:any):Observable<any> {
    return this.http.put(environment.apiPath + 'user', JSON.stringify(data), this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  public deleteUser (id:number):Observable<any> {
    return this.http.delete<any>(environment.apiPath + 'user/' + id, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('deleteUser'))
    );
  }

}
