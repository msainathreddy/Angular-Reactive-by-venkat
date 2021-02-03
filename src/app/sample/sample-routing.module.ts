import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { RouteResolver } from '../resolver';


const routes: Routes = [
  { path: '', component: CreateComponent },
  {
    path: 'samplecreate', component: CreateComponent, resolve: {
      validations: RouteResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule { }
