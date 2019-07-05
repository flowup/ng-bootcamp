import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MessageWithLikesModel } from '../../models/message-with-likes.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input() message: MessageWithLikesModel;
  @Output() messageLiked = new EventEmitter<void>();

  onClick(): void {
    this.messageLiked.emit();
  }
}
