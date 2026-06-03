import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatbotComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  get isDark() { return this.themeService.isDarkMode; }

  constructor(private themeService: ThemeService) {}
}
