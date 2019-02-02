import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
//import { UsersService } from './users.service';
//import { User } from './users.model';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({

  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public loading:boolean;
	public haveError:boolean;
	public displayedColumns:Array<string>;
	public dataSource = new MatTableDataSource();

	@ViewChild(MatSort) sort: MatSort;

  constructor(
		private userService:UserService,
		private router:Router
  ) {
		this.loading = true;
		this.haveError = false;
  }

  private getUsers = ():void => {
		this.loading = true;
		this.haveError = false;
		this.userService.getUsers().subscribe(res => {
      console.log(res)
      this.displayedColumns = []; this.displayedColumns.length = 0;
      this.displayedColumns = ['id', 'name', 'birthdate'];
      this.dataSource = new MatTableDataSource(res.slice());
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, (err) => {
      console.error(err);
      this.haveError = true;
      this.loading = false;
    });
  }
  public editUser = (userToEdit:User):void =>{
		console.log('DATOS ENVIO', userToEdit.id);
		if(userToEdit.hasOwnProperty('id') && String(userToEdit.id).length > 0){
			this.router.navigate ( [ '/user/edit', userToEdit.id ] );
		}
	}
	public createtUser = ():void =>{
		console.log('DATOS ENVIO');
		this.router.navigate ( [ '/new' ] );
	}

  ngOnInit() {
    this.getUsers();
  }

}
