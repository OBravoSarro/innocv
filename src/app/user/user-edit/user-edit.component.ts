import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public loading:boolean;
	public user:User;

	constructor(
		private route:ActivatedRoute,
		private router:Router,
    private userService:UserService,
    private snackBar: MatSnackBar,
    private translate:TranslateService,
    private dialog:MatDialog
  ) {
		this.loading = true;
	}



  private getUser = (id:number):void => {
		const loading = this.dialog.open(DialogComponent, {disableClose:true, data:{type:2, text:'users.loading_user'}});
    this.loading = true;
    this.userService.getUser(id).subscribe(res => {
      if(res.error || Object.keys(res).length === 0){
        loading.close();
        if(res.error) {
          this.showError('users.get_user_error');
        }
        this.router.navigate ( [ '/not-found' ] );
      }else{
        this.user = new User(res.id, res.name, res.birthdate);
        this.loading = false;
        loading.close();
      }
    }, (err) => {
      //console.error(err);
      loading.close();
      this.showError('users.get_user_error');
      this.router.navigate ( [ './not-found' ] );
    });
  }

  private showError = (text:string) => {
    this.dialog.open(DialogComponent, {disableClose:false, data:{type:1, text:text}});
  }

	public updateUser = (dataSend:User) => {
		const loading = this.dialog.open(DialogComponent, {disableClose:true, data:{type:2, text:'users.edit.loading'}});
		this.userService.updateUser(dataSend).subscribe(res => {
      if(!res.error){
        this.translate.get(['users.edit.success', 'accept']).subscribe((res:Object) => {
          this.snackBar.open(res['users.edit.success'], res['accept'], {duration: 4000});
          this.router.navigate ( [ '/user' ] );
        });
      }else{
        this.showError('users.edit.error');
      }
      loading.close();
    }, (err) => {
      //console.error(err);
      this.showError('users.edit.error');
      loading.close();
    });
  }

  public deleteUser = ():void =>{
		if(this.user.hasOwnProperty('id') && String(this.user.id).length > 0){
			this.router.navigate ( [ '/user/delete', this.user.id ] );
		}
	}

	ngOnInit() {
		if((this.route.snapshot.params['id'])){
      setTimeout(() => {
        this.getUser(this.route.snapshot.params['id']);
      });
		}else{
			this.router.navigate ( [ './not-found' ] );
		}
	}


}
