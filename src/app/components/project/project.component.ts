import {Component, OnInit} from "@angular/core";
import { LanguageService } from '../../services/language.service';
import {RouterModule} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {Project, ProjectService} from '../../services/project.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, TranslatePipe]
})
class ProjectComponent implements OnInit {
  menuOpen = false;
  projects: Project[] = [];

  // ← plus de lang = 'fr' local
  get lang() { return this.languageService.getLang(); }

  constructor(
    private projectService: ProjectService,
    private http: HttpClient,
    private languageService: LanguageService  // ← injecte
  ) {}

  setLang(l: string) {
    this.languageService.setLang(l);  // ← délègue au service
  }

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

export default ProjectComponent
