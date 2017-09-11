import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Supplier } from './supplier';

@NgModule({
  declarations: [
    Supplier,
  ],
  imports: [
    //  IonicModule.forChild(Supplier),
  ],
  exports: [
    Supplier
  ]
})
export class SupplierModule { }
