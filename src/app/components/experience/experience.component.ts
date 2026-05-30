import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { environment } from '../../../environments/environment';

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  type: string;
  tasks: string;
  technologies: string;
  titleEn?: string;
  tasksEn?: string;
  typeEn?: string;
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

  get lang() { return this.languageService.getLang(); }

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  setLang(l: string) {
    this.languageService.setLang(l);
  }

  closeMenu() { this.menuOpen = false; }

  ngOnInit(): void {
    this.http.get<Experience[]>(`${environment.apiUrl}/api/experiences`)
      .subscribe({
        next: (data) => {
          this.experiences = data.map(exp => ({ ...exp, showDetails: false }));
        },
        error: err => console.error('Erreur API:', err)
      });
  }

  toggleDetails(index: number): void {
    this.experiences[index].showDetails = !this.experiences[index].showDetails;
  }
}
