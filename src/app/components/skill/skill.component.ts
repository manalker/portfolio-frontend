import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

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
  skills: Skill[];
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
    this.http.get<Skill[]>('http://localhost:8081/api/skills').subscribe({
      next: data => this.groupByCategory(data),
      error: err => console.error('Erreur API:', err)
    });
  }

  private groupByCategory(skills: Skill[]): void {
    const grouped: { [key: string]: Skill[] } = {};
    skills.forEach(skill => {
      if (!grouped[skill.category]) grouped[skill.category] = [];
      grouped[skill.category].push(skill);
    });
    this.categories = Object.keys(grouped).map(cat => ({
      name: cat,
      skills: grouped[cat],
      showDetails: false
    }));
  }

  toggleDetails(category: SkillCategory): void {
    this.categories.forEach(c => {
      if (c !== category) c.showDetails = false;
    });
    category.showDetails = !category.showDetails;
  }
}
