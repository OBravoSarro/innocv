import {Component, Inject, Optional} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{

  public configDialog:{type:number, text:string};

  constructor(
    @Optional()  @Inject(MAT_DIALOG_DATA) public data: any,
    private router:Router
  ) {

  }

  ngOnInit() {
    if(!this.data || Object.keys(this.data).length == 0){
      this.router.navigate ( [ './not-found' ] );
    }
    else{
      this.configDialog = {
        type: this.data.type,
        text: (this.data.hasOwnProperty('text')) ? this.data.text:''
      };
    }
  }

}
