/**
 * Created by robert on 14/07/17.
 */
import {Injectable} from '@angular/core';
import {RequestOptions, Headers, Http} from "@angular/http";
import {environment} from "../../environments/environment";
import {CurrentUserService} from "./currentUser.service";
import {utils} from "protractor";
import {Utils} from "../common/Utils";


@Injectable()
export class FeedActionService {


  constructor(private http: Http,
              private currentUser: CurrentUserService) {

  }

  public likeFeed(feed: any, callback: any) {
    const url = environment.apiEndpoint + '/userfeed/v1/like';
    this.postAction({"feedId": feed.id, "status": "LIKE"}, url, callback);
  }

  public dislikeFeed(feed: any, callback: any) {
    const url = environment.apiEndpoint + '/userfeed/v1/like';
    this.postAction({"feedId": feed.id, "status": "DISLIKE"}, url, callback);
  }

  public bookmarkFeed(feed: any, callback: any) {
    const url = environment.apiEndpoint + '/userfeed/v1/bookmark';
    this.postAction({"feedId": feed.id, "status": true}, url, callback);
  }

  public notBookmark(feed: any, callback: any) {
    const url = environment.apiEndpoint + '/userfeed/v1/bookmark';
    this.postAction({"feedId": feed.id, "status": false}, url, callback);
  }

  private postAction(data: any, url: string, callback: any) {
    this.http.post(url, JSON.stringify(data), Utils.constructHeader()).subscribe(resp => {
    });
  }

}
