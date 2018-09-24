import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  lastmessage: string = 'prova';

  add(message: string) {
    this.messages.push(message);
    this.lastmessage = message;
  }
 
  clear() {
    this.messages = [];
  }
}