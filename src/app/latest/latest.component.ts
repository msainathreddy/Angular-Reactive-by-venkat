import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren, QueryList, OnChanges } from '@angular/core';
import { DateviewerComponent } from '../dateviewer/dateviewer.component'

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})

export class LatestComponent implements OnInit, OnChanges {

  @ViewChild('fullname') fullname: ElementRef

  //@ViewChild(DateviewerComponent) dateviewer: DateviewerComponent

  @ViewChildren(DateviewerComponent) dateviewer: QueryList<DateviewerComponent>

  constructor() { } 

  ngAfterViewInit() {
    this.fullname.nativeElement.focus();
    //this.fullname.nativeElement.value = "SAINATH REDDY";
   console.log(this.fullname); 
   console.log(this.dateviewer.toArray());
   this.dateviewer.toArray().forEach( element => {
    setInterval( () => {
      element.today = new Date();
    },1000);
   })
  //  setInterval( () => {
  //    //this.dateviewer.today = new Date()
  //  },1000);
  }

  ngOnChanges():void{
    console.log("Value:" + this.fullname.nativeElement.value);
  }
  ngOnInit(): void {

  }

}

