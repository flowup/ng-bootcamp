import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessageWithLikesModel } from '../../models/message-with-likes.model';
import { LikesService } from '../../services/http/likes.service';
import { MessagesService } from '../../services/http/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  readonly messages$ = this.messagesService.messages$;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly likesService: LikesService,
  ) {}

  likeMessage(message: MessageWithLikesModel): void {
    this.likesService.sendLike(message.id);
  }
}
