import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageWithLikesModel } from '../../models/message-with-likes.model';
import { LikesService } from '../../services/http/likes.service';
import { MessagesService } from '../../services/http/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  readonly messages$ = combineLatest(
    this.messagesService.messages$,
    this.likesService.likes$,
  ).pipe(
    map(([messages, likes]): MessageWithLikesModel[] =>
      messages.map(message => ({
        ...message,
        likes: likes.filter(({ messageId }) => messageId === message.id).length,
      })),
    ),
  );

  constructor(
    private readonly messagesService: MessagesService,
    private readonly likesService: LikesService,
  ) {}

  likeMessage(message: MessageWithLikesModel): void {
    this.likesService.sendLike(message.id);
  }

  trackById(index: number, message: MessageWithLikesModel): string {
    return message.id;
  }
}
