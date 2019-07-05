import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { AuthorModel } from '../../models/author.model';
import { MessageModel } from '../../models/message.model';

@Injectable()
export class MessagesService {
  private readonly messagesState$ = new BehaviorSubject<MessageModel[]>([]);
  private readonly messagesSocket$ = new WebSocketSubject<MessageModel>(
    `${environment.apiWsProtocol}://${environment.apiBaseUri}/messages/stream`,
  );

  readonly messages$ = this.messagesState$.asObservable();

  constructor() {
    this.messagesSocket$.subscribe(messages => {
      this.messagesState$.next([...this.messagesState$.value, messages]);
    });
  }

  sendMessage(text: string, author: AuthorModel): void {
    this.messagesSocket$.next({ text, author });
  }
}
