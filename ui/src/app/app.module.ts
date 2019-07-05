import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { EmojiPipe } from './pipes/emoji.pipe';
import { LikesService } from './services/http/likes.service';
import { MessagesService } from './services/http/messages.service';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    MessagesComponent,
    MessageFormComponent,
    EmojiPipe,
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [MessagesService, LikesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
