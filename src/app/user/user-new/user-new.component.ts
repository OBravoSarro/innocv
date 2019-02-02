import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { UserCreate } from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router:Router
  ) { }

  public createUser = (dataSend:UserCreate):void => {
		console.log(dataSend);
    this.userService.newUser(dataSend).subscribe(res => {
      console.log(res)
      this.router.navigate ( [ '/user' ] );
    }, (err) => {
      console.error(err);
    });
	}

  ngOnInit() {
  }

}
