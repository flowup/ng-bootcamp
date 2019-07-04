import { ChangeDetectionStrategy, Component } from '@angular/core';
import { of } from 'rxjs';
import { CommentModel } from '../../models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  readonly comments$ = of(
    Array(15)
      .fill(null)
      .map(
        (_, i): CommentModel => ({
          id: Math.random()
            .toString(26)
            .substr(2),
          text: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          `.substr(0, Math.random() * 250),
          timestamp: Date.now(),
          author: {
            name: `User #${i + 1}`,
            color:
              '#' +
              Math.random()
                .toString(16)
                .substr(2, 6),
          },
          likes: Math.round((Math.random() - 0.5) * 10),
        }),
      ),
  );

  likeComment(comment: CommentModel): void {
    console.log('Liked comment', comment);
  }
}