import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abstractString',
})
export class AbstractStringPipe implements PipeTransform {
  transform(value: String, ...args: unknown[]): String {
    return value.length >= 15 ? value.slice(0, 15) + '...' : value;
  }
}
