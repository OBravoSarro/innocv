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
	public haveError:boolean;
	public displayedColumns:Array<string>;
	public dataSource = new MatTableDataSource();

	@ViewChild(MatSort) sort: MatSort;

	constructor(
		private userService:UsersService,
		private router:Router
    ) {
		this.loading = true;
		this.haveError = false;
	}

	private getUsers = ():void => {
		this.loading = true;
		this.haveError = false;
		this.userService.getUsers().then((data) => {
			if(!data.error){
				console.log(data.data);
				this.displayedColumns = []; this.displayedColumns.length = 0;
				this.displayedColumns = ['id', 'name', 'birthdate'];
				this.dataSource = new MatTableDataSource(data.data.slice());
				console.log(this.dataSource);
				console.log(this.dataSource.data);
				this.dataSource.sort = this.sort;
				this.loading = false;
			}else{
				console.error('ERROR EN GETUSERS');
				this.haveError = true;
				this.loading = false;
			}

		});
	}

	public editUser = (userToEdit:User):void =>{
		console.log('DATOS ENVIO', userToEdit.id);
		if(userToEdit.hasOwnProperty('id') && String(userToEdit.id).length > 0){
			this.router.navigate ( [ '/users/edit', userToEdit.id ] );
		}
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