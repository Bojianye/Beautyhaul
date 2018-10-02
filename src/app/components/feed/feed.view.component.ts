import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router, ActivatedRoute} from '@angular/router';
import {FeedService} from '../../services/feed.service';
import {BaseComponent} from "../common/base.component";
import {RouterHistoryService} from "../../services/router.history.service";

@Component({
  moduleId: module.id,
  selector: 'feed-view',
  templateUrl: 'feed.view.component.html',
  styleUrls: ['feed.view.style.scss'],
  providers: [FeedService]
})
export class FeedViewComponent extends BaseComponent implements OnInit {
  feed: FeedView;

  feedId: string;

  constructor(private routeParams: ActivatedRoute,
              private feedService: FeedService,
              private router: Router,
              private history: RouterHistoryService) {
    super(history, router, 'Feed');
    this.feed = {
      id: '',
      title: '',
      type: '',
      description: '',
      thumbnail: '',
      authorId: '',
      authorDisplayName: '',
      authorAvatar: '',
      sections: [],
      commentCount: 0,
      likeCount: 0,
      viewCount: 0,
      youtubeHost: '',
      dislikeCount: 0,
      subscriberCount: 0,
      userFeed: {
        bookMarked: false,
        likeStatus: 'DISLIKE'
      }
    };
    this.routeParams.params.subscribe(params => {
      this.feedId = params['feedId'];
    });
  }

  ngOnInit() {
    this.feedService.getFeed(this.feedId).subscribe(result => {
      this.feed = {
        id: result.id,
        type: result.feedType,
        title: result.title,
        description: result.description,
        thumbnail: result.thumbnail ? result.thumbnail : '',
        commentCount: result.commentCount,
        likeCount: result.likeCount,
        viewCount: result.viewCount,
        sections: result.sections,
        subscriberCount: result.subscriberCount,
        authorId: result.author && result.author.userId ? result.author.userId : '',
        authorDisplayName: result.author && result.author.displayName ? result.author.displayName : '',
        authorAvatar: result.author && result.author.avatar ? result.author.avatar : '',
        youtubeHost: result.youtubeHost,
        dislikeCount: result.dislikeCount ? result.dislikeCount : 0,
        userFeed: result.userFeed ? result.userFeed : {}
      };
      if (result.userFeed) {
        this.feed.userFeed = result.userFeed;
      }
    });
  }
}

interface FeedView {
  id: string;
  type: string;
  title: string;
  description: string;
  thumbnail: string;
  authorId: string;
  authorDisplayName: string;
  authorAvatar: string;
  sections: any[];
  commentCount: number;
  likeCount: number;
  viewCount: number;
  youtubeHost: string;
  dislikeCount: number;
  userFeed: UserFeed;
  subscriberCount: number;
}

interface UserFeed {
  bookMarked: boolean;
  likeStatus: string;
}
