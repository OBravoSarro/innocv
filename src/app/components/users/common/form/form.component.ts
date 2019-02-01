import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserCredentials, UserCreate, User } from '../../users.model';
import { FormControl, Validators } from '@angular/forms';
import { DateValidator } from '../../../../common/validations/validations.service';

@Component({
	selector: 'cm-user-form',
	templateUrl: './form.template.html',
	providers: [
		{provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
		{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
		{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
	]
})

export class UserFormComponent implements OnInit {



	@Input() editData:User;
	@Output() sendDataEvent:EventEmitter<UserCreate | User> = new EventEmitter();
	public credentials:UserCredentials;
	public isEditForm:boolean;

	constructor(
		private adapter: DateAdapter<any>,
		private router:Router
	) {
		this.adapter.setLocale('es');
		this.credentials = {
			id: new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.min(1)]),
			name: new FormControl('', [Validators.required, Validators.minLength(5) , Validators.maxLength(20)]),
			birthdate: new FormControl('', [ DateValidator()])
		};
		this.isEditForm = false;
	}

	public sendData = ():void => {
		if(this.isFormValid()){
			let elementData:UserCreate | User;
			if(this.isEditForm) {
				elementData = new User(this.credentials.id.value, this.credentials.name.value, this.credentials.birthdate.value.add(1, 'days'))
			}else{
				elementData = new UserCreate(this.credentials.name.value, this.credentials.birthdate.value.add(1, 'days'));
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
		this.router.navigate ( [ '/users' ] );
	}

	public getErrorMessage(inputName:string):number {
		let error:number = 0;
		if(inputName == 'id' && String(this.credentials[inputName].value).length > 0){
			error = this.credentials.id.hasError('pattern') ? 1:
			this.credentials.id.hasError('min') ? 2 : 0;
		}else if(inputName == 'name' && String(this.credentials[inputName].value).length > 0){
			error = this.credentials.name.hasError('minlength') ? 1:
			this.credentials.name.hasError('maxlength') ? 2 : 0;
		}else if(inputName == 'birthdate'){
			error = this.credentials.birthdate.hasError('invalidDate') ? 1:0;
		}
		return error;
	}



	ngOnInit() {
		if(typeof(this.editData) != 'undefined'){
			this.credentials.id.setValue(this.editData.id);
			this.credentials.name.setValue(this.editData.name);
			this.credentials.birthdate.setValue(this.editData.birthdate);
			this.isEditForm = true;
		}else{

		}
	}

}