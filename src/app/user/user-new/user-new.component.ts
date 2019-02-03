import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router:Router,
    private snackBar: MatSnackBar,
    private translate:TranslateService,
    private dialog:MatDialog
  ) { }

  public createUser = (dataSend:User):void => {
    const loading = this.dialog.open(DialogComponent, {disableClose:true, data:{type:2, text:'users.new.loading'}});
    this.userService.newUser(dataSend).subscribe(res => {
      if(!res.error){
        this.translate.get(['users.new.success', 'accept']).subscribe((res:Object) => {
          this.snackBar.open(res['users.new.success'], res['accept'], {duration: 4000});
          this.router.navigate ( [ '/user' ] );
        });
      }else{
        this.dialog.open(DialogComponent, {disableClose:false, data:{type:1, text:'users.new.error'}});
      }
      loading.close();
    }, (err) => {
      //console.error(err);
      this.dialog.open(DialogComponent, {disableClose:false, data:{type:1, text:'users.new.error'}});
      loading.close();
    });
  }

  ngOnInit() {
  }

}
