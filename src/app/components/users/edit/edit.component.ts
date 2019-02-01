import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../users.model';

@Component({
	selector: 'app-users-edit',
	templateUrl: './edit.template.html'
})
export class UsersEditComponent implements OnInit {

	public loading:boolean;
	public user:User;

	constructor(
		private route:ActivatedRoute,
		private router:Router,
		private usersService:UsersService
    ) {
		this.loading = true;
	}

	private getUser = (userId:number):void => {
		console.log('LLAMA GET USER');
		this.loading = true;
		this.usersService.getUser(userId).then((data) => {
			if(!data.error){
				console.log(data.data);
				this.user = new User(data.data.id, data.data.name, data.data.birthdate);
				this.loading = false;
			}else{
				this.router.navigate ( [ '/users' ] );
			}
		});
	}

	public updateUser = (dataSend:User) => {
		console.log(dataSend);
		this.usersService.updateUsers(dataSend).then((data) => {
			console.log(data);
			this.router.navigate ( [ '/users' ] );
		});
	}

	ngOnInit() {
		console.log('ENTRA EN EDIT');
		if((this.route.snapshot.params['id'])){
			this.getUser(this.route.snapshot.params['id']);
		}else{
			this.router.navigate ( [ '/users' ] );
		}
	}

}