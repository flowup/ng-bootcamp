import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthorModel } from '../../models/author.model';
import { MessageModel } from '../../models/message.model';

const REFRESH_INTERVAL = 3000;

@Injectable()
export class MessagesService {
  private readonly messagesState$ = new BehaviorSubject<MessageModel[]>([]);

  readonly messages$ = this.messagesState$.asObservable();

  constructor(private readonly http: HttpClient) {
    interval(REFRESH_INTERVAL).subscribe(() => {
      this.refreshMessages();
    });
  }

  sendMessage(text: string, author: AuthorModel): void {
    const { apiHttpProtocol, apiBaseUri } = environment;
    const message: MessageModel = { text, author };
    this.http
      .post<void>(`${apiHttpProtocol}://${apiBaseUri}/messages`, message)
      .subscribe(() => {
        this.refreshMessages();
      });
  }

  private refreshMessages(): void {
    const messages = this.messagesState$.value;
    const { apiHttpProtocol, apiBaseUri } = environment;
    this.http
      .get<MessageModel[]>(
        messages.length > 0
          ? `${apiHttpProtocol}://${apiBaseUri}/messages?lastId=${messages[messages.length - 1].id}`
          : `${apiHttpProtocol}://${apiBaseUri}/messages`,
      )
      .subscribe(messages => {
        this.messagesState$.next([...this.messagesState$.value, ...messages]);
      });
  }
}
