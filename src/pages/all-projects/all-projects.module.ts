import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AllProjects } from './all-projects';

@NgModule({
  declarations: [
    AllProjects,
  ],
  imports: [
    //IonicModule.forChild(AllProjects),
  ],
  exports: [
    AllProjects
  ]
})
export class AllProjectsModule {}
