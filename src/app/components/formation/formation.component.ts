import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { environment } from '../../../environments/environment';

export interface Formation {
  id: number;
  diplome: string;
  etablissement: string;
  periode: string;
  diplomeEn?: string;
  etablissementEn?: string;
}

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, TranslatePipe]
})
export class FormationComponent implements OnInit {
  menuOpen = false;
  formations: Formation[] = [];

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
    this.http.get<Formation[]>(`${environment.apiUrl}/api/formations`).subscribe({
      next: (data) => this.formations = data,
      error: (err) => console.error('Erreur API:', err)
    });
  }
}
