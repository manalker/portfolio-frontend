import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  description: string;
  dateObtained: string;
}

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class CertificationComponent implements OnInit {

  certifications: Certification[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Certification[]>('http://localhost:8081/api/certifications')
      .subscribe({
        next: (data) => this.certifications = data,
        error: (err) => console.error('Erreur API:', err)
      });
  }
}
