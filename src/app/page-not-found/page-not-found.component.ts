import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  
  message:string="There is no room for the living beyond the wall! Turn back or join the dead!";

  constructor() { }

  ngOnInit() {
  }

}
