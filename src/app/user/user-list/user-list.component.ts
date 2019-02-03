import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { DialogComponent } from '../../shared/dialog/dialog.component';

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
    private router:Router,
    private dialog:MatDialog
  ) {
		this.loading = true;
		this.haveError = false;
  }

  private getUsers = ():void => {
    const loading = this.dialog.open(DialogComponent, {disableClose:true, data:{type:2, text:'users.loading_users'}});
		this.loading = true;
		this.haveError = false;
		this.userService.getUsers().subscribe(res => {
      if(!res.error){
        this.displayedColumns = []; this.displayedColumns.length = 0;
        this.displayedColumns = ['id', 'name', 'birthdate'];
        this.dataSource = new MatTableDataSource(res.slice());
        this.dataSource.sort = this.sort;
      }else{
        this.haveError = true;
      }
      loading.close();
      this.loading = false;
    }, (err) => {
      //console.error(err);
      loading.close();
      this.haveError = true;
      this.loading = false;
    });
  }
  public editUser = (userToEdit:User):void =>{
		if(userToEdit.hasOwnProperty('id') && String(userToEdit.id).length > 0){
			this.router.navigate ( [ '/user/edit', userToEdit.id ] );
		}
	}
	public createtUser = ():void =>{
		this.router.navigate ( [ '/new' ] );
	}

  ngOnInit() {
    setTimeout(() => {
      this.getUsers();
    });
  }

}
