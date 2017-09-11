import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Yourquote } from './yourquote';

@NgModule({
  declarations: [
    Yourquote,
  ],
  imports: [
    //  IonicModule.forChild(Yourquote),
  ],
  exports: [
    Yourquote
  ]
})
export class YourquoteModule { }
