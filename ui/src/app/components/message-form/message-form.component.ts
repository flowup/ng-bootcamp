import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from '../../services/http/messages.service';

function randomColor(): string {
  return (
    '#' +
    Math.random()
      .toString(16)
      .substr(2, 6)
  );
}

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageFormComponent {
  readonly form = this.formBuilder.group({
    name: ['Anonymous', Validators.required],
    color: [
      randomColor(),
      [Validators.required, Validators.pattern(/^#[0-9a-f]{6}$/)],
    ],
    text: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly messagesService: MessagesService,
  ) {}

  submit(): void {
    if (this.form.valid) {
      const { name, color, text } = this.form.value;
      this.messagesService.sendMessage(text, { name, color });
    }
  }
}
