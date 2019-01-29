import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
//import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

	constructor(public http: HttpClient) {

	}

	public post = (path:string,dataSend:any):Promise<any>  => {
		let deferer = new Promise<any>((resolve, reject) => {
			//let body = JSON.stringify(data);
			this.http.post(environment.apiPath+path,dataSend)
			.subscribe(
				data => {
					resolve({error:false,data:data});
				},
				err => {
					let _errorNo = 501;
					if(err.hasOwnProperty('error') && err.error.hasOwnProperty('errorNo')) _errorNo = err.error.errorNo;
					resolve({error:true,errorNo:_errorNo});
				}
			);
		});
		return deferer;
	}

	public put = (path:string,dataSend:any):Promise<any>  => {
		let deferer = new Promise<any>((resolve, reject) => {
			//let body = JSON.stringify(data);
			this.http.put(environment.apiPath+path,dataSend)
			.subscribe(
				data => {
					resolve({error:false,data:data});
				},
				err => {
					let _errorNo = 501;
					if(err.hasOwnProperty('error') && err.error.hasOwnProperty('errorNo')) _errorNo = err.error.errorNo;
					resolve({error:true,errorNo:_errorNo});
				}
			);
		});
		return deferer;
	}

	public delete = (path:string,dataSend:any):Promise<any>  => {
		let deferer = new Promise<any>((resolve, reject) => {
			//let body = JSON.stringify(data);
			this.http.delete(environment.apiPath+path, {params:dataSend})
			.subscribe(
				data => {
					resolve({error:false,data:data['data']});
				},
				err => {
					let _errorNo = 501;
					if(err.hasOwnProperty('error') && err.error.hasOwnProperty('errorNo')) _errorNo = err.error.errorNo;
					resolve({error:true,errorNo:_errorNo});
				}
			);
		});
		return deferer;
	}

	public get = (path:string,dataSend:any):Promise<any>  => {
		let deferer = new Promise<any>((resolve, reject) => {
			this.http.get(environment.apiPath+path, {params:dataSend})
			.subscribe(
				data => {
					resolve({error:false,data:data});
				},
				err => {
					let _errorNo = 501;
					if(err.hasOwnProperty('error') && err.error.hasOwnProperty('errorNo')) _errorNo = err.error.errorNo;
					resolve({error:true,errorNo:_errorNo});
				}
			);
		});
		return deferer;
	}
}