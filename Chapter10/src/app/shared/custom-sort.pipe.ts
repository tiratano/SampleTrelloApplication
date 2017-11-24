import { PipeTransform, Pipe } from '@angular/core';

import { Task } from '../model/task';

@Pipe({
    name: 'customSort'
})
export class CustomSort implements PipeTransform {

    transform(value: Task[], sort: boolean): Task[] {
      if (sort) {
        return value.sort(this.compare);
      }
      else {
        return value;
      }
    }
    private compare(a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      }

}
