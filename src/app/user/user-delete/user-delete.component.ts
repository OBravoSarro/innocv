import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';

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

	public deleteUser = (dataSend:User) => {
		this.userService.deleteUser(this.user.id).subscribe(res => {
      console.log(res)
      this.router.navigate ( [ '/user' ] );
    }, (err) => {
      console.error(err);
    });
  }

  public returnComponent = ():void =>{
		if(this.user.hasOwnProperty('id') && String(this.user.id).length > 0){
			this.router.navigate ( [ '/user/edit', this.user.id ] );
		}
	}

	ngOnInit() {
		if((this.route.snapshot.params['id'])){
			this.getUser(this.route.snapshot.params['id']);
		}else{
			this.router.navigate ( [ './not-found' ] );
		}
	}

}
