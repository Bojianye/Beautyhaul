import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import {CurrentUserService} from "./currentUser.service";
import {Utils} from "../common/Utils";

@Injectable()
export class FeedService {

  constructor(private http: Http,
              private currentUser: CurrentUserService) {

  }

  getInternalFeeds(nextPageToken: string) {
    return this.getFeeds(nextPageToken, 'INTERNAL', null);
  }

  getAllFeeds(nextPageToken: string) {
    return this.getFeeds(nextPageToken, 'ALL', null);
  }

  getAllFeedsByCataId(nextPageToken: string, cataId: string) {
    return this.getFeeds(nextPageToken, 'ALL', cataId);
  }

  private getFeeds(nextPageToken: string, source: string, tags: any) {
    var url = environment.apiEndpoint + "/feed/v1/list?";
    if (source === 'INTERNAL' || source === 'YOUTUBE') {
      url += 'source=' + source + '&';
    }
    if (nextPageToken) {
      url += 'nextPageToken=' + nextPageToken + '&';
    }
    if (tags) {
      url += 'tags=' + tags;
    }
    if (url.substr(url.length - 1, 1) === '&') {
      url = url.substr(0, url.length - 1);
    }

    return this.http.get(url, Utils.constructHeader()).map(res => {
      const data: any = {};
      const resp = res.json();
      data.nextPageToken = resp['nextPageToken'];
      data.feeds = this.buildFeeds(resp);
      return data;
    });
  }

  getFeed(feedId) {
    var url = environment.apiEndpoint + "/feed/v1/view/${feedId}";
    if (feedId) {
      url = url.replace("${feedId}", feedId);
    }
    return this.http.get(url, Utils.constructHeader()).map(res => res.json());
  }

  private buildFeeds(resp) {
    let feeds = [];
    for (var i in resp.data) {
      var result = resp.data[i];
      var feed: any;
      feed = {
        id: result.id,
        type: result.feedType,
        title: result.title,
        description: result.description,
        thumbnail: result.thumbnail ? result.thumbnail : '',
        commentCount: result.commentCount,
        likeCount: result.likeCount,
        viewCount: result.viewCount,
        authorId: result.author && result.author.userId ? result.author.userId : '',
        authorDisplayName: result.author && result.author.displayName ? result.author.displayName : '',
        authorAvatar: result.author && result.author.avatar ? result.author.avatar : '',
        videoId: result.videoId ? result.videoId : ''
      };
      feeds.push(feed);
    }
    return feeds;
  }

}
export class Feed {
  id: string;
  type: string;
  authorId: string;
  authorDisplayName: string;
  authorAvatar: string;
  title: string;
  description: string;
  thumbnail: string;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  videoId: string;
}
