import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { User, UserCreate } from './users.model';

@Injectable()
export class UsersService {


    constructor(private httpService:HttpService) {

    }

    public getUsers = () => {
		let deferer = new Promise<any>((resolve) => {
			this.httpService.get('User', {}).then((data) => {
				resolve(data);
			});
		});
		return deferer;
	}

    public getUser = (userId:number) => {
		let deferer = new Promise<any>((resolve) => {
			this.httpService.get('User/'+userId, {}).then((data) => {
				resolve(data);
			});
		});
		return deferer;
	}

    public createUsers = (dataUser:UserCreate) => {
		let deferer = new Promise<any>((resolve) => {
			this.httpService.post('User', dataUser).then((data) => {
				resolve(data);
			});
		});
		return deferer;
    }
    public updateUsers = (dataUser:User) => {
		let deferer = new Promise<any>((resolve) => {
			this.httpService.put('User', dataUser).then((data) => {
				resolve(data);
			});
		});
		return deferer;
    }

}
