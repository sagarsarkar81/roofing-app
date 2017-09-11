import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AddNewUser } from './add-new-user';

@NgModule({
  declarations: [
    AddNewUser,
  ],
  imports: [
    //IonicModule.forChild(AddNewUser),
  ],
  exports: [
    AddNewUser
  ]
})
export class AddNewUserModule {}
