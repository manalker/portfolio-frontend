import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // pour *ngIf / *ngFor
import { RouterModule } from '@angular/router';

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  type: string;
  tasks: string;
  technologies: string;
  showDetails?: boolean; // 👈 propriété optionnelle
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class ExperienceComponent implements OnInit {

  experiences: Experience[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getExperiences();
  }

  getExperiences(): void {
    this.http.get<Experience[]>('http://localhost:8081/api/experiences')
      .subscribe({
        next: (data: Experience[]) => {
          // On initialise showDetails = false pour chaque expérience
          this.experiences = data.map(exp => ({
            ...exp,
            showDetails: false
          }));
        },
        error: err => console.error('Erreur API:', err)
      });
  }

  toggleDetails(index: number): void {
    this.experiences[index].showDetails = !this.experiences[index].showDetails;
  }
}
