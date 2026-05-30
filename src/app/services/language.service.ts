// src/app/services/language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'  // ← disponible partout, une seule instance
})
export class LanguageService {

  private currentLang = 'fr';

  constructor(private translate: TranslateService) {
    this.translate.use('fr');
  }

  setLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
  }

  getLang(): string {
    return this.currentLang;
  }
}
