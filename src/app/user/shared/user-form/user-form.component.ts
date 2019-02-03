import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { DateValidator } from '../../../shared/validations/date-validator.service';
import { User, UserCredentials } from '../user.model';
import * as moment from "moment";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
	providers: [
		{provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
		{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
		{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
	]
})
export class UserFormComponent implements OnInit {

  	@Input() editData:User;
	@Output() sendDataEvent:EventEmitter<User> = new EventEmitter();
	public credentials:UserCredentials;
	public isEditForm:boolean;

  constructor(
    private adapter:DateAdapter<any>,
		private router:Router
  ) {
    this.adapter.setLocale('es');
		this.credentials = {
			name: new FormControl('', [Validators.required, Validators.minLength(5) , Validators.maxLength(20)]),
			birthdate: new FormControl('', [Validators.required, DateValidator()])
		};
		this.isEditForm = false;
  }

  public sendData = ():void => {
		if(this.isFormValid()){
			let elementData:User;
			if(this.isEditForm) {
				elementData = {
					id:this.editData.id, name:this.credentials.name.value, birthdate:this.credentials.birthdate.value.add(1, 'hours')
				};
			}else{
				elementData = {
					name:this.credentials.name.value, birthdate:this.credentials.birthdate.value.add(1, 'hours')
				}
			}
			this.sendDataEvent.emit(elementData);
		}
	}

	public isFormValid = ():boolean => {
		if(this.getErrorMessage('id') == 0 && this.getErrorMessage('name') == 0 && this.getErrorMessage('birthdate') == 0){
			return true;
		}else{
			return false;
		}
	}

	public clearInput = (inputName:string):void => {
		this.credentials[inputName].setValue('');
	}

	public return = () => {
		this.router.navigate ( [ '/user' ] );
	}

	public getErrorMessage(inputName:string):number {
		let error:number = 0;
		if(inputName == 'name'){
			error = this.credentials.name.hasError('required') ? 1:
					this.credentials.name.hasError('minlength') ? 2:
					this.credentials.name.hasError('maxlength') ? 3 : 0;
		}else if(inputName == 'birthdate'){
			error = this.credentials.birthdate.hasError('required') ? 1:
					this.credentials.birthdate.hasError('invalidDate') ? 2:0;
		}
		return error;
	}



	ngOnInit() {
		if(typeof(this.editData) != 'undefined'){
			this.credentials.name.setValue(this.editData.name);
			this.credentials.birthdate.setValue(moment(this.editData.birthdate));
			this.isEditForm = true;
		}else{

		}
	}

}
