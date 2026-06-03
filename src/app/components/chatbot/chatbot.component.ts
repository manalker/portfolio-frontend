import { Component, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  html?: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatbotComponent implements AfterViewChecked {
  @Input() isDark = true;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  isOpen = false;
  isLoading = false;
  userInput = '';

  messages: Message[] = [
    {
      role: 'assistant',
      content: '👋 Bonjour ! Je suis l\'assistant de Manal. Posez-moi des questions sur son profil, ses compétences ou ses projets !',
      html: '👋 Bonjour ! Je suis l\'assistant de Manal. Posez-moi des questions sur son profil, ses compétences ou ses projets !'
    }
  ];

  constructor(private chatbotService: ChatbotService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    try {
      const el = this.messagesContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  toggleChat() { this.isOpen = !this.isOpen; }

  formatMessage(text: string): string {
    return text
      // Titres **texte**
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Listes - item
      .replace(/^[-•]\s(.+)/gm, '<li>$1</li>')
      // Wrap les <li> consécutifs dans un <ul>
      .replace(/(<li>.*<\/li>(\n|$))+/g, (match) => `<ul>${match}</ul>`)
      // Numérotation 1. item
      .replace(/^\d+\.\s(.+)/gm, '<li>$1</li>')
      // Sauts de ligne → <br>
      .replace(/\n{2,}/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  sendMessage() {
    if (!this.userInput.trim() || this.isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: this.userInput,
      html: this.userInput
    };
    this.messages.push(userMessage);
    this.userInput = '';
    this.isLoading = true;

    this.chatbotService.sendMessage(this.messages).subscribe({
      next: (response) => {
        const raw = response.choices[0].message.content;
        this.messages.push({
          role: 'assistant',
          content: raw,
          html: this.formatMessage(raw)
        });
        this.isLoading = false;
      },
      error: () => {
        this.messages.push({
          role: 'assistant',
          content: '❌ Désolé, une erreur est survenue. Réessayez !',
          html: '❌ Désolé, une erreur est survenue. Réessayez !'
        });
        this.isLoading = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') this.sendMessage();
  }
}
