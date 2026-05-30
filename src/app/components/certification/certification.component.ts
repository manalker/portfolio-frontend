import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { OrderByDatePipe } from "../../order-by.pipe";
import { LanguageService } from '../../services/language.service';
import {environment} from '../../../environments/environment';

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  description: string;
  dateObtained: string;
  pdfUrl: string;
  titleEn?: string;
  descriptionEn?: string;
}

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, TranslatePipe, OrderByDatePipe]
})
export class CertificationComponent implements OnInit {
  menuOpen = false;
  certifications: Certification[] = [];

  get lang() { return this.languageService.getLang(); }

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  setLang(l: string) {
    this.languageService.setLang(l);
  }

  closeMenu() { this.menuOpen = false; }

  ngOnInit(): void {
    this.http.get<Certification[]>(`${environment.apiUrl}/api/certifications`)
      .subscribe({
        next: (data) => this.certifications = data,
        error: (err) => console.error('Erreur API:', err)
      });
  }
}
