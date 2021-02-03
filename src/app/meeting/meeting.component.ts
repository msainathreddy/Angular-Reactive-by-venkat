import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  meetingValidationsMessages:any;
  constructor(private aroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.aroute.data.subscribe((data) => {
      this.meetingValidationsMessages = data.validations;
     //console.log("Meeting data" + JSON.stringify(data))
      console.log("Meeting Validation Messages Data *" + JSON.stringify(this.meetingValidationsMessages))
      })
  }

}
