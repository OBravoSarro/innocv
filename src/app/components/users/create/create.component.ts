import { Component, OnInit } from '@angular/core';
import { UserCreate } from '../users.model';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-users-create',
	templateUrl: './create.template.html'
})
export class UsersCreateComponent implements OnInit {


	constructor(
		private userService:UsersService,
		private router:Router
    ) {

	}

	public createUser = (dataSend:UserCreate):void => {
		console.log(dataSend);
		this.userService.createUsers(dataSend).then((data) => {
			console.log(data);
			this.router.navigate ( [ '/users' ] );
		});
	}

	ngOnInit() {


	}

}