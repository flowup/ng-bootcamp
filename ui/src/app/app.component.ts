import { Component } from '@angular/core';
import { MessagesService } from './services/http/messages.service';
import { LikesService } from './services/http/likes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly messages$ = this.messagesService.messages$;
  readonly likes$ = this.likesService.likes$;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly likesService: LikesService,
  ) {}

  sendMessage(text: string): void {
    this.messagesService.sendMessage(text, {
      name: 'Cucoriedka69',
      color: 'red',
    });
  }

  sendLike(messageId: string): void {
    this.likesService.sendLike(messageId);
  }
}
