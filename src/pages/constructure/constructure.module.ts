import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Constructure } from './constructure';

@NgModule({
  declarations: [
    Constructure,
  ],
  imports: [
    //  IonicModule.forChild(Constructure),
  ],
  exports: [
    Constructure
  ]
})
export class ConstructureModule { }
