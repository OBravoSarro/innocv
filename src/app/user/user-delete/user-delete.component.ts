import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

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

	public deleteUser = () => {
    const loading = this.dialog.open(DialogComponent, {disableClose:true, data:{type:2, text:'users.delete.loading'}});
		this.userService.deleteUser(this.user.id).subscribe(res => {
      if(!res.error){
        this.translate.get(['users.delete.success', 'accept']).subscribe((res:Object) => {
          this.snackBar.open(res['users.delete.success'], res['accept'], {duration: 4000});
          this.router.navigate ( [ '/user' ] );
        });
      }else{
        this.showError('users.delete.error');
      }
      loading.close();
    }, (err) => {
      //console.error(err);
      this.showError('users.delete.error');
      loading.close();
    });
  }

  public returnComponent = ():void =>{
		if(this.user.hasOwnProperty('id') && String(this.user.id).length > 0){
			this.router.navigate ( [ '/user/edit', this.user.id ] );
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
  ngAfterViewInit(){

  }

}
