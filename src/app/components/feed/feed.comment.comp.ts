import {Component, HostListener, Input, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import 'rxjs/add/observable/of';
import {YoutubeCommentsService} from '../../services/youtube.comments.service';
import {FeedCommentService} from '../../services/feed.comment.service';
import {CurrentUserService} from '../../services/currentUser.service';
import {GtmService} from '../../services/gtm.service';
import {FeedModel} from './FeedModel';

@Component({
  moduleId: module.id,
  selector: 'feed-comments',
  templateUrl: 'feed.comment.comp.html',
  styleUrls: ['feed.view.style.scss'],
  providers: [YoutubeCommentsService, FeedCommentService, GtmService]
})

export class FeedCommentComp implements OnInit {

  @Input()
  feed: FeedModel;

  videoId: string;

  youtubeComments: YouTubeComment[];

  feedComments: Comment[];

  youtubeNextPageToken: string;

  feedCommentNextPageToken: string;

  isLoading: boolean;
  commentAlert: boolean;

  comment: string;

  isLoggedinUser: boolean;
  author: string;
  avatar: string;
  errorMessage: string;

  constructor(public sanitizer: DomSanitizer,
              private youtubeCommentsService: YoutubeCommentsService,
              private currentUserService: CurrentUserService,
              private feedCommentService: FeedCommentService,
              private gtmService : GtmService) {
    this.feedComments = [];
    this.youtubeComments = [];
    this.youtubeNextPageToken = '';
    this.feedCommentNextPageToken = '';
    this.isLoading = false;
    this.commentAlert = false;
    this.comment = '';
    this.isLoggedinUser = this.currentUserService.checkLogin();
  }

  @HostListener('window:scroll', ['$event'])
  scroll(event) {
    const pageYOffset = window.pageYOffset;
    const documentHeight = document.documentElement.offsetHeight;
    const windowHeight = document.documentElement.clientHeight;
    if (pageYOffset + windowHeight > documentHeight - 500) {
      if (!this.isLoading) {
        this.isLoading = true;
        this.showMore();
      }
    }
  }

  ngOnInit() {
    if (this.currentUserService.checkLogin()) {
      const userInfo = this.currentUserService.getUserInfo();
      this.author = userInfo.firstName;
      this.avatar = userInfo.avatar;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['feed']) {
      if (this.feed.type === 'VIDEO') {
        // retrieve the youttube comments.
        this.videoId = this.feed.sections[0].content;
        if (this.videoId) {
          this.youtubeCommentsService.getComments(this.videoId, this.youtubeNextPageToken).subscribe(resp => {
            this.youtubeComments.push(this.parseYoutubeResponse(resp));
          });
        }
      }
      // retrieve the internal comments and only requires feedId
      this.feedCommentService.listFeedComment(this.feed.id, this.feedCommentNextPageToken).subscribe(resp => {
        if (resp.status === 200 && resp.data && resp.data.length > 0) {
          for (var i in resp.data) {
            var avatar = resp.data[i].avatar ? resp.data[i].avatar : '';
            this.feedComments.push({
              authorName: resp.data[i].userName,
              authorAvatar: avatar,
              content: resp.data[i].comment,
              hasReplies: false,
              replies: []
            });
          }
        }
      });
    }
  }

  parseYoutubeResponse(resp) {
    var comments: Comment[];
    var youtubeComment: YouTubeComment;

    comments = [];
    youtubeComment = {
      comments: comments
    };

    resp.items.map(function (current) {

      var item = current.snippet.topLevelComment.snippet;
      var name = item.authorDisplayName;
      var avatar = item.authorProfileImageUrl;
      var text = item.textDisplay;
      var replies = [];

      var hasReplies = current.hasOwnProperty('replies');
      if (hasReplies) {
        current.replies.comments.map(function (currentReply) {
          var replyItem = currentReply.snippet;
          replies.push({
            authorName: replyItem.authorDisplayName,
            authorAvatar: replyItem.authorProfileImageUrl,
            content: replyItem.textDisplay,
            hasReplies: false,
            replies: []
          });
        })
      }

      comments.push({
        authorName: name,
        authorAvatar: avatar,
        content: text,
        hasReplies: hasReplies,
        replies: replies
      });
    });

    this.youtubeNextPageToken = resp.nextPageToken;
    youtubeComment.comments = comments;

    return youtubeComment;
  }

  showMore() {
    if (this.videoId && this.youtubeNextPageToken) {
      this.isLoading = true;
      this.youtubeCommentsService.getComments(this.videoId, this.youtubeNextPageToken).subscribe(resp => {
        this.youtubeComments.push(this.parseYoutubeResponse(resp));
        this.isLoading = false;
      });
    }
  }

  addFeedComment() {
    if (!this.comment) {
      this.commentAlert = true;
      this.errorMessage = 'Content Error.';
      return;
    }
    if (this.comment.trim().length > 800) {
      this.commentAlert = true;
      this.errorMessage = 'Too many characters.';
      return;
    }
    if (this.comment.trim().length === 0) {
      this.commentAlert = true;
      this.errorMessage = 'Content Error.';
      return;
    }
    this.feedCommentService.addFeedComment(this.feed.id, this.comment, resp => {
      this.comment = '';
      this.gtmService.sendGeneralEvent("feed-action", "comment", "add");
      if (resp.status === 200 && resp._body && resp._body.trim().length > 0) {
        const commentResponse = JSON.parse(resp._body);
        if (commentResponse && commentResponse.data) {
          this.feedComments.unshift({
            authorName: commentResponse.data.userName,
            authorAvatar: this.avatar,
            content: commentResponse.data.comment,
            hasReplies: false,
            replies: []
          });
        }
      }
    });
  }

  commentChanged(event) {
    if (this.comment && this.comment.length > 800) {
      this.commentAlert = true;
      this.errorMessage = 'Too many characters.';
    }else {
      this.commentAlert = false;
    }
  }
}

interface YouTubeComment {
  comments: Comment[];
}

interface Comment {
  authorName: string;
  authorAvatar: string;
  content: string;
  hasReplies: boolean;
  replies: Comment[];
}

