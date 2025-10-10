import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅ Nécessaire pour <a routerLink>

@Component({
  selector: 'app-root',
  standalone: true,              // ✅ Ajoute cette ligne
  imports: [RouterModule],       // ✅ Active routerLink dans ton HTML
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
