import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { environment } from '../../../environments/environment';

export interface Experience {
  id: number;
  title: string;
  titleEn?: string;
  company: string;
  startDate: string;
  endDate: string;
  type: string;
  typeEn?: string;
  technologies: string;
  tasks: string;
  tasksEn?: string;
  showDetails?: boolean;
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, TranslatePipe]
})
export class ExperienceComponent implements OnInit {
  menuOpen = false;
  experiences: Experience[] = [];

  get lang()   { return this.languageService.getLang(); }
  get isDark() { return this.themeService.isDarkMode; }
  toggleTheme() { this.themeService.toggleTheme(); }

  constructor(
    private http: HttpClient,
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {}

  setLang(l: string) { this.languageService.setLang(l); }
  closeMenu()        { this.menuOpen = false; }

  ngOnInit(): void {
    this.http.get<Experience[]>(`${environment.apiUrl}/api/experiences`)
      .subscribe({
        next: (data) => this.experiences = data.map(e => ({ ...e, showDetails: false })),
        error: (err) => console.error('Erreur API:', err)
      });
  }

  toggleDetails(i: number): void {
    this.experiences[i].showDetails = !this.experiences[i].showDetails;
  }
}
