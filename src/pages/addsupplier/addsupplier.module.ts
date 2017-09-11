import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Addsupplier } from './addsupplier';

@NgModule({
  declarations: [
    Addsupplier,
  ],
  imports: [
    //  IonicModule.forChild(Addsupplier),
  ],
  exports: [
    Addsupplier
  ]
})
export class AddsupplierModule { }
