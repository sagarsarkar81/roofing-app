import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ForgotPassword } from './forgot-password';

@NgModule({
  declarations: [
    ForgotPassword,
  ],
  imports: [
    //IonicModule.forChild(ForgotPassword),
  ],
  exports: [
    ForgotPassword
  ]
})
export class ForgotPasswordModule {}
