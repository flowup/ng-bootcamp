import { Component } from '@angular/core';
import { MessageModel } from '../../models/message.model';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  messages: MessageModel[];

  constructor(private readonly messagesService: MessagesService) {
    this.messagesService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }
}
