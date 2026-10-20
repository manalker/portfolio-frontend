import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = '/api/chatbot';

  constructor(private http: HttpClient) {}

  sendMessage(messages: { role: string; content: string }[]): Observable<any> {
    return this.http.post(this.apiUrl, { messages });
  }
}
