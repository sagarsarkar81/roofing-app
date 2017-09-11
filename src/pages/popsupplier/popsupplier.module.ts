import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Popsupplier } from './popsupplier';

@NgModule({
  declarations: [
    Popsupplier,
  ],
  imports: [
    //IonicModule.forChild(Popsupplier),
  ],
  exports: [
    Popsupplier
  ]
})
export class PopsupplierModule { }
