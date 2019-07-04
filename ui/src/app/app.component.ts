import { Component } from '@angular/core';
import { PostService } from './services/http/post.service';
import { ReactionService } from './services/http/reaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly posts$ = this.postService.posts$;
  readonly reactions$ = this.reactionService.reactions$;

  constructor(
    private readonly postService: PostService,
    private readonly reactionService: ReactionService,
  ) {}

  sendPost(text: string): void {
    this.postService.sendPost({
      author: 'Cucoriedka69',
      text,
    });
  }

  sendReaction(postId: string): void {
    this.reactionService.sendReaction({
      type: 'clap',
      postId,
    });
  }
}
