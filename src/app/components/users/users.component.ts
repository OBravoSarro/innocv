import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-users',
	templateUrl: './users.template.html'
})
export class UsersComponent implements OnInit {

	public loading:boolean;
	public displayedColumns:Array<string>;
	public dataSource = new MatTableDataSource();
	private users:Array<User>;

	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private userService:UsersService,
		private router:Router
    ) {
		this.users = [];
		this.loading = true;
	}

	private getUsers = ():void => {
		this.userService.getUsers().then((data) => {
			if(!data.error){
				console.log(data.data);
				this.displayedColumns = []; this.displayedColumns.length = 0;
				this.displayedColumns = ['id', 'name', 'birthdate'];
				this.users = []; this.users.length = 0;
				this.users = data.data.slice();
				this.dataSource = new MatTableDataSource(this.users);
				console.log(this.dataSource.data);
				this.dataSource.sort = this.sort;
				this.loading = false;
			}else{
				console.error('ERROR EN GETUSERS');
			}

		});
	}

	public editUser = (userToEdit:User):void =>{
		console.log('DATOS ENVIO', userToEdit);
	}
	public createtUser = ():void =>{
		console.log('DATOS ENVIO');
		this.router.navigate ( [ '/users/create' ] );
	}

	ngOnInit() {
		console.log('ENTRA EN USERS');
		this.getUsers();
	}

}