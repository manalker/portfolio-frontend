import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatbotComponent {
  isOpen = false;
  isLoading = false;
  userInput = '';
  messages: Message[] = [
    {
      role: 'assistant',
      content: '👋 Bonjour ! Je suis l\'assistant de Manal. Posez-moi des questions sur son profil, ses compétences ou ses projets !'
    }
  ];

  constructor(private chatbotService: ChatbotService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage: Message = { role: 'user', content: this.userInput };
    this.messages.push(userMessage);
    this.userInput = '';
    this.isLoading = true;

    this.chatbotService.sendMessage(this.messages).subscribe({
      next: (response) => {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.choices[0].message.content
        };
        this.messages.push(assistantMessage);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chatbot:', err);
        this.messages.push({
          role: 'assistant',
          content: '❌ Désolé, une erreur est survenue. Réessayez !'
        });
        this.isLoading = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') this.sendMessage();
  }
}
