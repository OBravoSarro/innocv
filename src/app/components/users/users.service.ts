import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { User } from './users.model';

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

    public createUsers = (dataUser:User) => {
		let deferer = new Promise<any>((resolve) => {
			this.httpService.post('User', dataUser).then((data) => {
				resolve(data);
			});
		});
		return deferer;
    }

}
