import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'nameAvatar'})
export class NameAvatarPipe implements PipeTransform {
  transform(value: string): string {
    if (value && value !== '') {
      return value.charAt(0);
    }
    return "BH";
  }
}
