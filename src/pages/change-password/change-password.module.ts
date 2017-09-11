import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChangePassword } from './change-password';

@NgModule({
  declarations: [
    ChangePassword,
  ],
  imports: [
    //IonicModule.forChild(ChangePassword),
  ],
  exports: [
    ChangePassword
  ]
})
export class ChangePasswordModule {}
