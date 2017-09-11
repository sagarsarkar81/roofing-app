import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Addconstructer } from './addconstructer';

@NgModule({
  declarations: [
    Addconstructer,
  ],
  imports: [
    //  IonicModule.forChild(Addconstructer),
  ],
  exports: [
    Addconstructer
  ]
})
export class AddconstructerModule { }
