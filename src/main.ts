import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import { ProjectComponent } from './app/components/project/project.component';
import { CertificationComponent } from './app/components/certification/certification.component';
import { FormationComponent } from './app/components/formation/formation.component';
import { ExperienceComponent } from './app/components/experience/experience.component';
import { SkillsComponent } from './app/components/skill/skill.component';
import { ContactComponent } from './app/components/contact/contact.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

import 'zone.js';

// ✅ ROUTES
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project', component: ProjectComponent }, 
  { path: 'certification', component: CertificationComponent }, 
  { path: 'formation', component: FormationComponent }, 
  { path: 'experience', component: ExperienceComponent }, 
  { path: 'skills', component: SkillsComponent }, 
  { path: 'contact', component: ContactComponent }, 

];

// ✅ BOOTSTRAP APPLICATION
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),  // <-- rend HttpClient disponible pour tous les composants standalone
    importProvidersFrom(
      RouterModule.forRoot(routes, {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    )
  ]
});
