import { Component, OnInit } from "@angular/core";
import { LanguageService } from '../../services/language.service';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Project, ProjectService } from '../../services/project.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, TranslatePipe]
})

export default class ProjectComponent implements OnInit {
  menuOpen = false;
  projects: Project[] = [];

  get lang() { return this.languageService.getLang(); }
  get isDark() { return this.themeService.isDarkMode; }
  toggleTheme() { this.themeService.toggleTheme(); }

  constructor(
    private projectService: ProjectService,
    private http: HttpClient,
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {}

  setLang(l: string) { this.languageService.setLang(l); }
  closeMenu() { this.menuOpen = false; }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: (err) => console.error('Erreur API:', err)
    });
  }

  toggleDescription(index: number) {
    this.projects[index].showDescription = !this.projects[index].showDescription;
  }
}
