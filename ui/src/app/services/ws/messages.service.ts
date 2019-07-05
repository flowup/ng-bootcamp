import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { AuthorModel } from '../../models/author.model';
import { MessageWithLikesModel } from '../../models/message-with-likes.model';
import { MessageModel } from '../../models/message.model';
import { LikesService } from '../http/likes.service';

@Injectable()
export class MessagesService {
  private readonly messagesState$ = new BehaviorSubject<MessageModel[]>([]);
  private readonly messagesSocket$ = new WebSocketSubject<MessageModel>(
    `${environment.apiWsProtocol}://${environment.apiBaseUri}/messages/stream`,
  );

  readonly messages$ = combineLatest(
    this.messagesState$,
    this.likesService.likes$,
    (messages, likes): MessageWithLikesModel[] =>
      messages.map(message => ({
        ...message,
        likes: likes.filter(({ messageId }) => messageId === message.id).length,
      })),
  );

  constructor(private readonly likesService: LikesService) {
    this.messagesSocket$.subscribe(messages => {
      this.messagesState$.next([...this.messagesState$.value, messages]);
    });
  }

  sendMessage(text: string, author: AuthorModel): void {
    this.messagesSocket$.next({ text, author });
  }
}
