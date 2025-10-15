import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

export interface Formation {
  id: number;
  diplome: string;
  etablissement: string;
  periode: string;
}

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule]
})
export class FormationComponent implements OnInit {
  formations: Formation[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Formation[]>('http://localhost:8081/api/formations').subscribe({
      next: (data) => this.formations = data,
      error: (err) => console.error('Erreur API:', err)
    });
  }

  downloadCV() {
    this.http.get('assets/docs/cv_manal_kerroumi.pdf', { responseType: 'blob' })
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
