import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CreateProjectStep1 } from './create-project-step-1';

@NgModule({
  declarations: [
    CreateProjectStep1,
  ],
  imports: [
    //IonicModule.forChild(CreateProjectStep1),
  ],
  exports: [
    CreateProjectStep1
  ]
})
export class CreateProjectStep1Module {}
