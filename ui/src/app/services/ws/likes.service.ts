import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { LikeModel } from '../../models/like.model';

@Injectable()
export class LikesService {
  private readonly likesState$ = new BehaviorSubject<LikeModel[]>([]);
  private readonly likesSocket$ = new WebSocketSubject<LikeModel>(
    `${environment.apiWsProtocol}://${environment.apiBaseUri}/likes/stream`,
  );

  readonly likes$ = this.likesState$.asObservable();

  constructor() {
    this.likesSocket$.subscribe(likes => {
      this.likesState$.next([...this.likesState$.value, likes]);
    });
  }

  sendLike(messageId: string): void {
    this.likesSocket$.next({ messageId });
  }
}
