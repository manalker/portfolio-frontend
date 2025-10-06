import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import 'zone.js';

// Importe tous tes composants standalone
import { HomeComponent } from './app/components/home/home.component';
import { AboutComponent } from './app/components/about/about.component';
import { FormationComponent } from './app/components/formation/formation.component';
import { ExperienceComponent } from './app/components/experience/experience.component';
import { CertificationComponent } from './app/components/certification/certification.component';
import { SkillComponent } from './app/components/skill/skill.component';
import { ProjectComponent } from './app/components/project/project.component';
import { ContactComponent } from './app/components/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'certification', component: CertificationComponent },
  { path: 'skill', component: SkillComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'contact', component: ContactComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(CommonModule, RouterModule.forRoot(routes)),
    provideHttpClient()
  ]
})
.catch(err => console.error(err));
