import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/project.component';
import { AboutComponent } from './components/about/about.component';
import { FormationComponent } from './components/formation/formation.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { CertificationComponent } from './components/certification/certification.component';
import { SkillComponent } from './components/skill/skill.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'about', component: AboutComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'certification', component: CertificationComponent },
  { path: 'skills', component: SkillComponent },
  { path: 'contact', component: ContactComponent },
];
