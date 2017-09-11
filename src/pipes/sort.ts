import { Pipe, PipeTransform } from '@angular/core';
import {MattDamon} from '../../pipes/matt-damon';

/**
 * Generated class for the Sort pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'sort',
})
export class Sort implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a[args] < b[args]) {
        return -1;
      } else if (a[args] > b[args]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
