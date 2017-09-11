import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Viewprojects } from './viewprojects';

@NgModule({
  declarations: [
    Viewprojects,
  ],
  imports: [
    //IonicModule.forChild(Viewprojects),
  ],
  exports: [
    Viewprojects
  ]
})
export class ViewprojectsModule { }
