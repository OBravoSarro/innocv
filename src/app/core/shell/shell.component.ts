import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  constructor(
    private translate: TranslateService
  ){
		this.translate.setDefaultLang('es');
		this.translate.use('es');
	}

  ngOnInit() {
  }

}
