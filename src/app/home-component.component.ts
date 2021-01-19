import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from './Service/home-service.service'
import { IWatch } from './employee/IWatch';
import { DemoDirectiveDirective} from '../../src/app/demo-directive.directive'

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  watData:IWatch[];
  constructor(private homeser: HomeServiceService) { }

  ngOnInit(): void {
     this.homeser.getWatches().subscribe(
       data => {
         this.watData = data;
         console.log("D "+ JSON.stringify(data));
         console.log("W "+ JSON.stringify(this.watData));
        },
        (err) => console.log(err)
     );
  }
  greet(){
     this.homeser.sendMessage('Good Morning')
  }
  appreciate(){
     this.homeser.sendMessage('Well Done')
  }

}
