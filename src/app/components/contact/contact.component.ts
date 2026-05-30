import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import {environment} from '../../../environments/environment';

interface Contact {
  id: number;
  phone: string;
  email: string;
  city: string;
  linkedin: string;
  github: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, TranslatePipe]
})
export class ContactComponent implements OnInit {
  menuOpen = false;
  contact!: Contact;

  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  get lang() { return this.languageService.getLang(); }

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {}

  setLang(l: string) { this.languageService.setLang(l); }
  closeMenu() { this.menuOpen = false; }

  ngOnInit(): void {
    this.http.get<Contact[]>(`${environment.apiUrl}/api/contacts`).subscribe(data => {
      this.contact = data[0];
    });
  }

  sendMessage() {
    console.log('Message envoyé :', this.form);
    alert(`Merci ${this.form.name}, votre message a été envoyé !`);
    this.form = { name: '', email: '', subject: '', message: '' };
  }
}
