import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'htmlBreak'})
export class HtmlBreakPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/(?:\r\n|\r|\n)/g, "<br />");
  }
}
