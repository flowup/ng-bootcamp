import { Component } from '@angular/core';
import { CommentModel } from './models/comment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly comment: CommentModel = {
    id: Math.random()
      .toString(26)
      .substr(2),
    text: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    `,
    timestamp: Date.now(),
    author: {
      name: 'Happy Hippo',
      color: '#45ff4a',
    },
  };
}
