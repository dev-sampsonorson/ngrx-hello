import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from './models/post.model';
import * as PostActions from './actions/post.actions';



interface AppState {
  message: string;
  post: Post;
}

@Component({
  selector: 'app-root',
  template: `
    {{ message$ | async }}

    <br />
    <button (click)="spanishMessage()">Spanish</button>
    <button (click)="frenchMessage()">French</button>
    <hr />
    <div *ngIf="post$ | async as p">
      <h2>{{ p.text }}</h2>
      <h4>Votes: {{ p.likes }}</h4>

      <button (click)="upvote()">Upvote</button>
      <button (click)="downvote()">Downvote</button>
      <button (click)="resetPost()">Reset</button>

      <br />
      <input [(ngModel)]="text" />
      <button (click)="editText()">Change Title</button>
    </div>
  `,
  styles: [`
    i { font-size: 2em; }
    button { margin-bottom: 10px; }
  `]
})
export class AppComponent {
  message$: Observable<string>;
  post$: Observable<Post>;

  text!: string;

  constructor(private store: Store<AppState>) {
    this.message$ = this.store.select('message');
    this.post$ = this.store.select('post');
  }

  spanishMessage() {
    this.store.dispatch({ type: 'SPANISH' });
  }

  frenchMessage() {
    this.store.dispatch({ type: 'FRENCH' });
  }

  editText() {
    this.store.dispatch(new PostActions.EditText(this.text));
  }

  upvote() {
    this.store.dispatch(new PostActions.Upvote());
  }

  downvote() {
    this.store.dispatch(new PostActions.Downvote());
  }

  resetPost() {
    this.store.dispatch(new PostActions.Reset());
  }
}
