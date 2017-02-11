import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'key'
})
export class KeyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keyArr: any[] = Object.keys(value);
    return keyArr;
  }

}
