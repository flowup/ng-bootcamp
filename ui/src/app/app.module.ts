import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MessagesService } from './services/http/messages.service';
import { LikesService } from './services/http/likes.service';

@NgModule({
  declarations: [AppComponent, MessageComponent, MessagesComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [MessagesService, LikesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
