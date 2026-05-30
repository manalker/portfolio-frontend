import { Component } from "@angular/core";
import { LanguageService } from '../../services/language.service';
import {RouterModule} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menuOpen = false;

  // ← plus de lang = 'fr' local, on lit depuis le service
  get lang() { return this.languageService.getLang(); }

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private languageService: LanguageService  // ← injecte
  ) {}

  setLang(l: string) {
    this.languageService.setLang(l);  // ← délègue au service
  }

  closeMenu() { this.menuOpen = false; }

  downloadCV() {
    this.http.get('assets/docs/manal-kerroumi.pdf', { responseType: 'blob' })
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
