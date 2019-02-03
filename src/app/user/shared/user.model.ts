import { FormControl } from '@angular/forms';

export class User{
	constructor(
		public id?:number,
		public name?:string,
		public birthdate?:Date
	){}
}
export class UserCredentials{
	constructor(
		public name:FormControl,
		public birthdate:FormControl
	){}
}