import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'countDisplay'})
export class CountDisplayPipe implements PipeTransform {
  transform(value: any): string {
    // var newValue = '';
    //
    // if (value >= 10000) {
    //   var suffixes = ["", "K", "M", "B", "T"];
    //   var suffixNum = Math.floor(("" + value).length / 3);
    //   var shortValue;
    //   for (var precision = 2; precision >= 1; precision--) {
    //     shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum) ) : value).toPrecision(precision));
    //     var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
    //     if (dotLessShortValue.length <= 2) {
    //       break;
    //     }
    //   }
    //   return shortValue + suffixes[suffixNum];
    // }
    // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (value === 0 || value === '0') {
      return '0';
    }
    var k = 1000,
      sizes = [' ', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
      i = Math.floor(Math.log(value) / Math.log(k));
    return (Math.ceil(value / Math.pow(k, i))) + sizes[i];
  }
}
