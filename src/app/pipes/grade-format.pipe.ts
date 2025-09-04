import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gradeFormat',
  standalone: true,
})
export class GradeFormatPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    const raw = value.toString().replace(/\./g, '').toUpperCase();
    const groups = raw.match(/.{1,2}/g) || [];
    return groups.join('.');
  }
}
