import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CreateProject } from './create-project';

@NgModule({
  declarations: [
    CreateProject,
  ],
  imports: [
    //IonicModule.forChild(CreateProject),
  ],
  exports: [
    CreateProject
  ]
})
export class CreateProjectModule {}
