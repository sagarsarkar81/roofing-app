import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Userview } from './userview';

@NgModule({
  declarations: [
    Userview,
  ],
  imports: [
    //IonicModule.forChild(Userview),
  ],
  exports: [
    Userview
  ]
})
export class UserviewModule { }
