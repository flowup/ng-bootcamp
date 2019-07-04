import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentsComponent } from './components/comments/comments.component';
import { PostService } from './services/http/post.service';
import { ReactionService } from './services/http/reaction.service';

@NgModule({
  declarations: [AppComponent, CommentComponent, CommentsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [PostService, ReactionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
