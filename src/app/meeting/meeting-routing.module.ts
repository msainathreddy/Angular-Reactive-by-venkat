import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingComponent } from './meeting.component';
import { RouteResolver } from '../resolver';

const routes: Routes = [
  { path: 'createMeeting', component: MeetingComponent , resolve: {
    validations: RouteResolver
  } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule { }
