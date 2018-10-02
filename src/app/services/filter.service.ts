/**
 * Created by robert on 12/07/17.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";
import {SessionStorageService} from "./sessionStorage.service";
import {CurrentUserService} from "./currentUser.service";
import {Utils} from "../common/Utils";


@Injectable()
export class FilterService {

  constructor(private sessionStorage: SessionStorageService,
              private currentUser: CurrentUserService,
              private http: Http) {

  }

  public hasFilter(topic: string) {
    let found = false;
    const filterArray = this.sessionStorage.getObject('filter_key_words');
    if (!Utils.isEmpty(filterArray)) {
      filterArray.forEach(item => {
        if (item.topic === topic) {
          found = true;
        }
      });
    }
    return found;
  }

  public filterForYou(nextpageToken: string, callback: any) {
    this.filter(null, nextpageToken, callback);
  }

  public filterByTopic(topic: string, nextpageToken: string, callback: any) {
    this.filter(topic, nextpageToken, callback);
  }

  public filter(topic: string, nextpageToken: string, callback: any) {
    let url = environment.apiEndpoint + '/feed/v1/topic/filter?';
    if (topic) {
      url += 'topic=' + topic;
      const filterArray = this.sessionStorage.getObject('filter_key_words');
      if (!Utils.isEmpty(filterArray)) {
        filterArray.forEach(item => {
          if (item.topic === topic) {
            url += '&q=' + item.subTopic;
          }
        });
      }
    }
    if (nextpageToken) {
      url += '&nextPageToken=' + nextpageToken;
    }
    this.http.get(url, Utils.constructHeader()).map(res => res.json()).subscribe(resp => {
      if (resp.status === 200) {
        callback(resp);
      }
    });
  }

}
