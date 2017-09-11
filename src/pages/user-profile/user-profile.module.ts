import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { UserProfile } from './user-profile';

@NgModule({
  declarations: [
    UserProfile,
  ],
  imports: [
    //IonicModule.forChild(UserProfile),
  ],
  exports: [
    UserProfile
  ]
})
export class UserProfileModule {}
