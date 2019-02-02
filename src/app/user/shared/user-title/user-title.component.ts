import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-title',
  templateUrl: './user-title.component.html',
  styleUrls: ['./user-title.component.scss']
})
export class UserTitleComponent implements OnInit {

  @Input() titleText:string;

  constructor() { }

  ngOnInit() {
  }

}
