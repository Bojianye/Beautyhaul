import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'feed-card-base',
  templateUrl:'./feed.card.base.html'
})
export class FeedCardBaseComp {

  @Input()
  title: string;

  @Input()
  author: string;

  @Input()
  views: number;

  @Input()
  comments: number;

  @Input()
  avatar : string;

  @Input()
  thumbnail : string;

  @Input()
  feedId: string;

  constructor(private router: Router) {
    this.title = "";
    this.author = "";
    this.views = 0;
    this.comments = 0;
    this.feedId = "";
  }

  linkFeed() {
    this.router.navigate(['/feed', this.feedId]);
  }
}
