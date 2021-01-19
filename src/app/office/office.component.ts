import { Component, OnInit } from '@angular/core';
import { HomeServiceService} from '../Service/home-service.service'

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  constructor(private homeser: HomeServiceService) { }

  ngOnInit(): void {
    this.homeser.homemessage$
    .subscribe(
      message => {
        if(message === 'Good Morning'){
          alert("Good Morning Teacher")
        }else if(message === 'Well Done'){
          alert("Thank You Sir");
        }
      }
    )
  }

}
