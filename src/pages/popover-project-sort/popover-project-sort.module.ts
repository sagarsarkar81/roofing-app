import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PopoverProjectSort } from './popover-project-sort';

@NgModule({
  declarations: [
    PopoverProjectSort,
  ],
  imports: [
    //IonicModule.forChild(PopoverProjectSort),
  ],
  exports: [
    PopoverProjectSort
  ]
})
export class PopoverProjectSortModule {}
