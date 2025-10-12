import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- pour ngModel

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
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule]
})
export class ContactComponent implements OnInit {
  contact!: Contact;

  // Formulaire de contact
  form = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Contact[]>('http://localhost:8081/api/contacts').subscribe(data => {
      this.contact = data[0]; // on prend le premier contact
    });
  }

  // Méthode pour envoyer le message
  sendMessage() {
    console.log('Message envoyé :', this.form);
    alert(`Merci ${this.form.name}, votre message a été envoyé !`);
    this.form = { name: '', email: '', subject: '', message: '' }; // reset formulaire
  }

  
}
