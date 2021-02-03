import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleRoutingModule } from './sample-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ CreateComponent],
  imports: [
    CommonModule,
    SampleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SampleModule { }
