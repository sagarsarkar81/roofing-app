import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Qoutemodal } from './qoutemodal';

@NgModule({
  declarations: [
    Qoutemodal,
  ],
  imports: [
    //  IonicModule.forChild(Qoutemodal),
  ],
  exports: [
    Qoutemodal
  ]
})
export class QoutemodalModule { }
