import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ReactionModel } from '../../models/reaction.model';

const REFRESH_INTERVAL = 5000;

@Injectable()
export class ReactionService {
  private readonly reactionState$ = new BehaviorSubject<ReactionModel[]>([]);

  readonly reactions$ = this.reactionState$.asObservable();

  constructor(private readonly http: HttpClient) {
    interval(REFRESH_INTERVAL).subscribe(() => {
      this.refreshReactions();
    });
  }

  sendReaction(reaction: ReactionModel): void {
    const { apiHttpProtocol, apiBaseUri } = environment;
    this.http
      .post<void>(`${apiHttpProtocol}://${apiBaseUri}/reactions`, reaction)
      .subscribe(() => {
        this.refreshReactions();
      });
  }

  private refreshReactions(): void {
    const reactions = this.reactionState$.value;
    const { apiHttpProtocol, apiBaseUri } = environment;
    this.http
      .get<ReactionModel[]>(
        reactions.length > 0
          ? `${apiHttpProtocol}://${apiBaseUri}/reactions?lastId=${reactions[reactions.length - 1].id}`
          : `${apiHttpProtocol}://${apiBaseUri}/reactions`,
      )
      .subscribe(reactions => {
        this.reactionState$.next([...this.reactionState$.value, ...reactions]);
      });
  }
}
