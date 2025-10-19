import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate'
})
export class OrderByDatePipe implements PipeTransform {
  transform(certifications: any[], order: 'asc' | 'desc' = 'desc'): any[] {
    if (!certifications) return [];

    return certifications.sort((a, b) => {
      const getTime = (dateStr: string) => {
        if (!dateStr || dateStr.trim() === '') return 0;
        const parts = dateStr.split('/');
        if (!parts || parts.length !== 2) return 0;
        const month = parseInt(parts[0], 10);
        const year = parseInt(parts[1], 10);
        if (isNaN(month) || isNaN(year)) return 0;
        return new Date(year, month - 1).getTime();
    };

      const timeA = getTime(a.dateObtained);
      const timeB = getTime(b.dateObtained);

      return order === 'asc' ? timeA - timeB : timeB - timeA;
    });
  }
}
