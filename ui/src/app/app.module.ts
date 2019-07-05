import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesService } from './services/http/messages.service';
import { LikesService } from './services/http/likes.service';
import { MessageFormComponent } from './components/message-form/message-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    MessagesComponent,
    MessageFormComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [MessagesService, LikesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
