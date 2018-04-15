import { NgModule } from '@angular/core';
import { ReverseStringPipe } from './pipes/reverse.pipe'

@NgModule({
  declarations: [
    ReverseStringPipe
  ],
  exports: [
    ReverseStringPipe
  ]
})

export class SharedModule{}