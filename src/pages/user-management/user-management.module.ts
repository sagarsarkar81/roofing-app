import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UserManagement } from './user-management';

@NgModule({
  declarations: [
    UserManagement,
  ],
  imports: [
    //IonicModule.forChild(UserManagement),
  ],
  exports: [
    UserManagement
  ]
})
export class UserManagementModule {}
