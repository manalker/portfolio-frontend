import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private isDark = true;

  constructor() {
    const saved = localStorage.getItem('theme');
    this.isDark = saved ? saved === 'dark' : true;
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  get isDarkMode(): boolean {
    return this.isDark;
  }

  private applyTheme(): void {
    if (this.isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }
}
