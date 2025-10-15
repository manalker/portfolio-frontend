import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

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
