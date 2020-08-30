import { Pipe } from '@angular/core';

@Pipe({name: 'fillRows'}) 
export class FillRowsPipe{ 
  transform(value, size: number) { 
    if(!value || !size) {
      size = 10;
    }
    var missing = size - (value ? value.length : 0);
    if(missing < 0) {
      return null;
    }
    return new Array(missing).fill(null); 
  }
}