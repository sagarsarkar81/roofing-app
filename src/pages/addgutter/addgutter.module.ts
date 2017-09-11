import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Addgutter } from './addgutter';

@NgModule({
  declarations: [
    Addgutter,
  ],
  imports: [
    //  IonicModule.forChild(Addgutter),
  ],
  exports: [
    Addgutter
  ]
})
export class AddgutterModule { }
