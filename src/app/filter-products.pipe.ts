import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts',
})
export class FilterProductsPipe implements PipeTransform {
  transform(products: any[]): any[] {
    return products.filter((product) => product.count > 0);
  }
}
