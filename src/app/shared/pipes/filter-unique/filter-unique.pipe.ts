import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnique'
})
export class FilterUniquePipe implements PipeTransform {

  transform(items: any[], ...args: any[]): any[] {
    // Remove the duplicate elements
    let result: any[] =[];
    items.filter((item) => {
      result.push(item[`${args[0]}`].charAt(0).toUpperCase() + item[`${args[0]}`].slice(1));
  });

  let uniqueArray = result.filter((el, index, array) => {
    return array.indexOf (el) == index;
  });

  return uniqueArray;
  }

}
