import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Skill {
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
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class SkillsComponent implements OnInit {

  categories: SkillCategory[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSkills();
  }

  getSkills(): void {
    this.http.get<Skill[]>('http://localhost:8081/api/skills')
      .subscribe({
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
    // Ferme toutes les autres catégories sauf celle cliquée
    this.categories.forEach(c => {
      if (c !== category) c.showDetails = false;
    });

    // Toggle la catégorie cliquée
    category.showDetails = !category.showDetails;
  }

  downloadCV() {
    this.http.get('assets/docs/cv_manal_kerroumi.pdf', { responseType: 'blob' })
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'manal-kerroumi.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Erreur téléchargement CV:', error);
      });
  }
  
}
