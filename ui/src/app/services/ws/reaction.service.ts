import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { ReactionModel } from '../../models/reaction.model';

@Injectable()
export class ReactionService {
  private readonly reactionState$ = new BehaviorSubject<ReactionModel[]>([]);
  private readonly reactionSocket$ = new WebSocketSubject<ReactionModel>(
    `${environment.apiWsProtocol}://${environment.apiBaseUri}/reactions/stream`,
  );

  readonly reactions$ = this.reactionState$.asObservable();

  constructor() {
    this.reactionSocket$.subscribe(reactions => {
      this.reactionState$.next([...this.reactionState$.value, reactions]);
    });
  }

  sendReaction(reaction: ReactionModel): void {
    this.reactionSocket$.next(reaction);
  }
}
