import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Editprojects } from './editprojects';

@NgModule({
  declarations: [
    Editprojects,
  ],
  imports: [
    //IonicModule.forChild(Editprojects),
  ],
  exports: [
    Editprojects
  ]
})
export class EditprojectsModule { }
