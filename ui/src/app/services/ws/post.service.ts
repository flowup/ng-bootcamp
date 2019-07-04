import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';
import { PostModel } from '../../models/post.model';

@Injectable()
export class PostService {
  private readonly postState$ = new BehaviorSubject<PostModel[]>([]);
  private readonly postSocket$ = new WebSocketSubject<PostModel>(
    `${environment.apiWsProtocol}://${environment.apiBaseUri}/posts/stream`,
  );

  readonly posts$ = this.postState$.asObservable();

  constructor() {
    this.postSocket$.subscribe(posts => {
      this.postState$.next([...this.postState$.value, posts]);
    });
  }

  sendPost(post: PostModel): void {
    this.postSocket$.next(post);
  }
}
