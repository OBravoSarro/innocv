import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

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
		private userService:UserService
    ) {
		this.loading = true;
	}

  private getUser = (id:number):void => {
		console.log('LLAMA GET USER');
    this.loading = true;
    this.userService.getUser(id).subscribe(res => {
      console.log(res)
      if(Object.keys(res).length === 0){
        console.error('User not found');
        this.router.navigate ( [ '/not-found' ] );
      }else{
        this.user = new User(res.id, res.name, res.birthdate);
        this.loading = false;
      }
    }, (err) => {
      console.error(err);
      this.router.navigate ( [ './not-found' ] );
    });
	}

	public updateUser = (dataSend:User) => {
		console.log(dataSend);
		this.userService.updateUser(dataSend).subscribe(res => {
      console.log(res)
      this.router.navigate ( [ '/user' ] );
    }, (err) => {
      console.error(err);
    });
  }

  public deleteUser = ():void =>{
		if(this.user.hasOwnProperty('id') && String(this.user.id).length > 0){
			this.router.navigate ( [ '/user/delete', this.user.id ] );
		}
	}

	ngOnInit() {
		console.log('ENTRA EN EDIT');
		if((this.route.snapshot.params['id'])){
			this.getUser(this.route.snapshot.params['id']);
		}else{
			this.router.navigate ( [ './not-found' ] );
		}
	}


}
