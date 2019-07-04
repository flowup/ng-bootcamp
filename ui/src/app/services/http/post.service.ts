import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PostModel } from '../../models/post.model';

const REFRESH_INTERVAL = 3000;

@Injectable()
export class PostService {
  private readonly postState$ = new BehaviorSubject<PostModel[]>([]);

  readonly posts$ = this.postState$.asObservable();

  constructor(private readonly http: HttpClient) {
    interval(REFRESH_INTERVAL).subscribe(() => {
      this.refreshPosts();
    });
  }

  sendPost(post: PostModel): void {
    const { apiHttpProtocol, apiBaseUri } = environment;
    this.http
      .post<void>(`${apiHttpProtocol}://${apiBaseUri}/posts`, post)
      .subscribe(() => {
        this.refreshPosts();
      });
  }

  private refreshPosts(): void {
    const posts = this.postState$.value;
    const { apiHttpProtocol, apiBaseUri } = environment;
    this.http
      .get<PostModel[]>(
        posts.length > 0
          ? `${apiHttpProtocol}://${apiBaseUri}/posts?lastId=${posts[posts.length - 1].id}`
          : `${apiHttpProtocol}://${apiBaseUri}/posts`,
      )
      .subscribe(posts => {
        this.postState$.next([...this.postState$.value, ...posts]);
      });
  }
}
