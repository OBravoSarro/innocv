import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, args:string): string {
    if (value === null) return '';
    switch(args){
      case 'first':
        return value.charAt(0).toUpperCase() + value.slice(1);
      break;
      default:
        let words = String(value).split(' ');
        let resultWord = [];
        words.forEach(function(word) {
          resultWord.push(String(word).charAt(0).toUpperCase() + String(word).slice(1).toLowerCase());
        });
        return resultWord.join(' ');
      break;
    }
  }

}
