import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], ...args: any[]): any[] {
    let result: any[] =[];
    if(!args[0]) {return items};
    items.filter((item) => {
      if(item[`${args[1]}`].toLowerCase()
      .includes(args[0].toLowerCase())) {
    result.push(item)
    }
  });
  return result ;
  }

}
