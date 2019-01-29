import { Pipe } from '@angular/core';
@Pipe({
	name:"capitalize"
})
export class CapitalizePipe {
	transform(value:string, format?:string):string {
		let result:string = "";

		if(value && value.length){
			switch(format){
				case 'first':
					result = String(value).charAt(0).toUpperCase() + String(value).slice(1).toLowerCase();
				break;
				default:
					let words = String(value).split(' ');
					let resultWord = [];
					words.forEach(function(word) {
						resultWord.push(String(word).charAt(0).toUpperCase() + String(word).slice(1).toLowerCase());
					});
					result = resultWord.join(' ');
				break;
			}
		}

		return result;
	}
}
