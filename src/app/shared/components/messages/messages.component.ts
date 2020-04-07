import { Component } from '@angular/core';

import { MessageService } from '../../../core/providers/message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(private messageService: MessageService) {}

  getMessages(): string[] {
    return this.messageService.messages;
  }

  clearMessages() {
    this.messageService.clear();
  }
}
