import { NgModule } from '@angular/core';
import { SampleComponent } from './sample.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    SampleComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports: [
    SampleComponent
  ]
})
export class SampleModule { }
