import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'cm-title',
	templateUrl: './title.template.html'
})
export class TitleComponent implements OnInit {

	@Input() titleText:string;

	constructor(

	) {

	}



	ngOnInit() {

	}

}