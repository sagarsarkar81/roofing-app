import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Supplierqoute } from './supplierqoute';

@NgModule({
  declarations: [
    Supplierqoute,
  ],
  imports: [
    //IonicModule.forChild(Supplierqoute),
  ],
  exports: [
    Supplierqoute
  ]
})
export class SupplierqouteModule { }
