import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Makequote } from './makequote';

@NgModule({
  declarations: [
    Makequote,
  ],
  imports: [
    //  IonicModule.forChild(Makequote),
  ],
  exports: [
    Makequote
  ]
})
export class MakequoteModule { }
