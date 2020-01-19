import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
 */
@Pipe({ name: 'phone' })
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    const areaCode = value.slice(0, 3);
    const phoneNum = value.slice(3);
    const phoneNumFormatted = phoneNum.slice(0, 3) + '-' + phoneNum.slice(3);
    return `(${areaCode}) ${phoneNumFormatted}`;
  }
}
