  import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'termtext'
})
export class termtextPipe implements PipeTransform {

  transform(text: string , limit:number): string {
    return text.split(' ').slice(0, limit ).join(' ');
  }

}
