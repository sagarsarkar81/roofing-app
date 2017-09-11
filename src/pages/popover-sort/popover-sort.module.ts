import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PopoverSort } from './popover-sort';

@NgModule({
  declarations: [
    PopoverSort,
  ],
  imports: [
    //IonicModule.forChild(PopoverSort),
  ],
  exports: [
    PopoverSort
  ]
})
export class PopoverSortModule {}
