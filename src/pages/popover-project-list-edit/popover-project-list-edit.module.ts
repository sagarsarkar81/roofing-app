import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PopoverProjectListEdit } from './popover-project-list-edit';

@NgModule({
  declarations: [
    PopoverProjectListEdit,
  ],
  imports: [
    //IonicModule.forChild(PopoverProjectListEdit),
  ],
  exports: [
    PopoverProjectListEdit
  ]
})
export class PopoverProjectListEditModule {}
