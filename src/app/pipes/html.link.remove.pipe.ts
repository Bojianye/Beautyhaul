import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'htmlLinkRemove'})
export class HtmlLinkRemovePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/<a\b[^>]*>(.*?)<\/a>/i,"");
  }
}
