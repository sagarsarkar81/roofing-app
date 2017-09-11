import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PopoverProjectListFilter } from './popover-project-list-filter';

@NgModule({
  declarations: [
    PopoverProjectListFilter,
  ],
  imports: [
    //IonicModule.forChild(PopoverProjectListFilter),
  ],
  exports: [
    PopoverProjectListFilter
  ]
})
export class PopoverProjectListFilterModule {}
