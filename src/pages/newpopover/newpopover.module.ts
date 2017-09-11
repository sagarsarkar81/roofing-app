import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NewpopoverPage } from './newpopover';

@NgModule({
  declarations: [
    NewpopoverPage,
  ],
  imports: [
    //IonicModule.forChild(NewpopoverPage),
  ],
  exports: [
    NewpopoverPage
  ]
})
export class NewpopoverPageModule {}
