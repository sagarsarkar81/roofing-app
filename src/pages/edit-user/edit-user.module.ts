import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { EditUser } from './edit-user';

@NgModule({
  declarations: [
    EditUser,
  ],
  imports: [
    //IonicModule.forChild(EditUser),
  ],
  exports: [
    EditUser
  ]
})
export class EditUserModule { }
