import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/components/home/home.component';
import ProjectComponent from './app/components/project/project.component';
import { CertificationComponent } from './app/components/certification/certification.component';
import { FormationComponent } from './app/components/formation/formation.component';
import { ExperienceComponent } from './app/components/experience/experience.component';
import { SkillsComponent } from './app/components/skill/skill.component';
import { ContactComponent } from './app/components/contact/contact.component';
import { provideHttpClient, withFetch, HttpClient } from '@angular/common/http'; // ← ajoute HttpClient
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';          // ← ajoute
import { TranslateHttpLoader } from '@ngx-translate/http-loader';                // ← ajoute

import 'zone.js';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'certification', component: CertificationComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'contact', component: ContactComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    importProvidersFrom(
      RouterModule.forRoot(routes, {
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      TranslateModule.forRoot({    // ← ajoute ça
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
});
