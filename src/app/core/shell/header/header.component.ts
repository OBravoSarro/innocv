import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
        opacity: 0
      })),
      state('final', style({
        opacity: 1
      })),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  public currentState:string;

  constructor() {
    this.currentState = 'initial';
  }

  ngOnInit() {
  }
  ngAfterViewChecked() {
    this.currentState = 'final';
  }
}
