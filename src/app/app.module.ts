import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

import { EmployeeService} from '../app/employee/employee.service';

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component.component';
import { PageNotFoundComponentComponent } from './page-not-found-component.component';
import { LatestComponent } from './latest/latest.component';
import { DateviewerComponent } from './dateviewer/dateviewer.component';
import { DemoDirectiveDirective } from './demo-directive.directive';
import { OfficeComponent } from './office/office.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent, 
    PageNotFoundComponentComponent, LatestComponent, DateviewerComponent, DemoDirectiveDirective, OfficeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule  
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
