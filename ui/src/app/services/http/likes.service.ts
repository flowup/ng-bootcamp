import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LikeModel } from '../../models/like.model';

const REFRESH_INTERVAL = 5000;

@Injectable()
export class LikesService {
  private readonly likesState$ = new BehaviorSubject<LikeModel[]>([]);

  readonly likes$ = this.likesState$.asObservable();

  constructor(private readonly http: HttpClient) {
    interval(REFRESH_INTERVAL).subscribe(() => {
      this.refreshLikes();
    });
  }

  sendLike(messageId: string): void {
    const { apiHttpProtocol, apiBaseUri } = environment;
    const like: LikeModel = { messageId };
    this.http
      .post<void>(`${apiHttpProtocol}://${apiBaseUri}/likes`, like)
      .subscribe(() => {
        this.refreshLikes();
      });
  }

  private refreshLikes(): void {
    const likes = this.likesState$.value;
    const { apiHttpProtocol, apiBaseUri } = environment;
    this.http
      .get<LikeModel[]>(
        likes.length > 0
          ? `${apiHttpProtocol}://${apiBaseUri}/likes?lastId=${likes[likes.length - 1].id}`
          : `${apiHttpProtocol}://${apiBaseUri}/likes`,
      )
      .subscribe(likes => {
        this.likesState$.next([...this.likesState$.value, ...likes]);
      });
  }
}
