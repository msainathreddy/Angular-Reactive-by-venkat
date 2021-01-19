import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dateviewer',
  templateUrl: './dateviewer.component.html',
  styleUrls: ['./dateviewer.component.css']
})
export class DateviewerComponent implements OnInit {
  
  today: Date = new Date();
 // @ViewChild('home') home: ElementRef;
  constructor() { }

  ngOnInit(): void { 
  }

}
