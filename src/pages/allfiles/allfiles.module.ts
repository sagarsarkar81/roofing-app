import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AllfilesPage } from './allfiles';

@NgModule({
  declarations: [
    AllfilesPage,
  ],
  imports: [
  //  IonicModule.forChild(AllfilesPage),
  ],
  exports: [
    AllfilesPage
  ]
})
export class AllfilesPageModule {}
