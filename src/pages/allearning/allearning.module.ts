import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Allearning } from './allearning';

@NgModule({
  declarations: [
    Allearning,
  ],
  imports: [
    //IonicModule.forChild(Allearning),
  ],
  exports: [
    Allearning
  ]
})
export class AllearningModule { }
