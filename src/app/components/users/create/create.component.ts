import { Component, OnInit } from '@angular/core';
import { User } from '../users.model';
import { UsersService } from '../users.service';

@Component({
	selector: 'app-users-create',
	templateUrl: './create.template.html'
})
export class UsersCreateComponent implements OnInit {


	constructor(
		private userService:UsersService
    ) {

	}

	public createUser = (dataSend:User):void => {
		console.log(dataSend);
		this.userService.createUsers(dataSend).then((data) => {
			console.log(data);
		});
	}

	ngOnInit() {


	}

}