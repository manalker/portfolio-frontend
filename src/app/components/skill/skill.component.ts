import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { environment } from '../../../environments/environment';

interface Skill {
  color: any;
  level: any;
  id: number;
  category: string;
  description: string;
  icon: string;
}

interface SkillCategory {
  name: string;
  nameEn: string;
  skills: { name: string; icon: string }[];
  showDetails?: boolean;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, TranslatePipe]
})
export class SkillsComponent implements OnInit {
  menuOpen = false;
  categories: SkillCategory[] = [];

  get lang() { return this.languageService.getLang(); }

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  setLang(l: string) { this.languageService.setLang(l); }
  closeMenu() { this.menuOpen = false; }

  ngOnInit(): void {
    // On appelle /grouped qui retourne name + nameEn
    this.http.get<SkillCategory[]>(`${environment.apiUrl}/api/skills/grouped`).subscribe({
      next: data => this.categories = data,
      error: err => console.error('Erreur API:', err)
    });
  }

  toggleDetails(category: SkillCategory): void {
    this.categories.forEach(c => {
      if (c !== category) c.showDetails = false;
    });
    category.showDetails = !category.showDetails;
  }
}
