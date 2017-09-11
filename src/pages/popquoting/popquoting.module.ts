import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Popquoting } from './popquoting';

@NgModule({
  declarations: [
    Popquoting,
  ],
  imports: [
    //  IonicModule.forChild(Popquoting),
  ],
  exports: [
    Popquoting
  ]
})
export class PopquotingModule { }
