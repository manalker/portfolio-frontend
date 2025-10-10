import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
  standalone: true // ← important si pas de app.module.ts
})
export class UniquePipe implements PipeTransform {
  transform(value: any[], key: string): any[] {
    if (!Array.isArray(value) || !key) return [];
    return value.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
    );
  }
}
