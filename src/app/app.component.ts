import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
[x: string]: any;
  isAdmin: boolean = false;
  isUser: boolean = false;
  hideHeaderFooter: boolean = false;

  constructor() {}

  ngOnInit() {
  }
  
  
}
