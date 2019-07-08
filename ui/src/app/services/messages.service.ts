import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WebSocketSubject } from 'rxjs/webSocket';
import { AuthorModel } from '../models/author.model';
import { MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private readonly messagesState$ = new BehaviorSubject<MessageModel[]>([]);
  private readonly messagesSocket$ = new WebSocketSubject<MessageModel>(
    'ws://35.198.179.24/messages/stream',
  );

  readonly messages$ = this.messagesState$.asObservable();

  constructor() {
    this.messagesSocket$.subscribe(message => {
      this.messagesState$.next([message, ...this.messagesState$.value]);
    });
  }

  sendMessage(text: string, author: AuthorModel): void {
    this.messagesSocket$.next({ text, author });
  }
}
