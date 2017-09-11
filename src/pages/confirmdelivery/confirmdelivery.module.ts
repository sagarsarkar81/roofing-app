import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Confirmdelivery } from './confirmdelivery';

@NgModule({
  declarations: [
    Confirmdelivery,
  ],
  imports: [
    //  IonicModule.forChild(Confirmdelivery),
  ],
  exports: [
    Confirmdelivery
  ]
})
export class ConfirmdeliveryModule { }
