import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import {CurrentUserService} from "./currentUser.service";
import 'rxjs/add/operator/map';
import {Utils} from "../common/Utils";


@Injectable()
export class FeedCommentService {

  constructor(private http: Http, private currentUser: CurrentUserService) {

  }

  public addFeedComment(feedId: string, comment: string, callback) {
    let url = environment.apiEndpoint + "/feed/v1/comment/create";
    if (this.isValidComment(feedId, comment)) {
      var postData = {
        'feedId': feedId,
        'comment': comment
      }
      this.http.post(url, JSON.stringify(postData), Utils.constructHeader()).subscribe(resp => {
        callback(resp);
      });
    }
  }

  public listFeedComment(feedId: string, nextPageToken: string) {
    let url = environment.apiEndpoint + "/feed/v1/comment/list";
    if (feedId && feedId.trim().length > 0) {
      url += "?feedId=" + feedId;
      url += "&resultSize=20"
      if (nextPageToken && nextPageToken.trim().length > 0) {
        url += "&nextPageToken=" + nextPageToken;
      }
      return this.http.get(url, Utils.constructHeader()).map(res => res.json());
    }
  }

  private isValidComment(feedId: string, comment: string) {
    if (!this.currentUser.checkLogin()) {
      return false;
    }
    if (!feedId || feedId.trim().length <= 0) {
      return false;
    }
    if (!comment || comment.trim().length <= 0 || comment.trim().length > 1000) {
      return false;
    }
    return true;
  }

}
