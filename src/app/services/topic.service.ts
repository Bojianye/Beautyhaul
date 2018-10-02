/**
 * Created by robert on 10/07/17.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";
import {LocalStorageService} from "./localStorage.service";
import {Category} from "../components/video/CategoryModel";
import {SessionStorageService} from "./sessionStorage.service";
import {isEmpty} from "rxjs/operator/isEmpty";
import {Utils} from "../common/Utils";

@Injectable()
export class TopicService {

  constructor(private http: Http,
              private local: SessionStorageService) {

  }

  public getTopicByCategory(category: string, callback: any) {
    const url = environment.apiEndpoint + '/media/v1/topics?category=' + category;
    this.http.get(url, Utils.constructHeader()).map(res => res.json()).subscribe(resp => {
      if (resp.status === 200) {
        this.local.setObject(category, resp.data);
        callback(resp.data);
      }
    });
  }

  public getSubTopicByCategory(category: string, callback: any) {
    if (Utils.isEmpty(this.local.getObject(category))) {
      this.getTopicByCategory(category, resp => {
        this.filterSubCategory(resp, callback);
      });
    } else {
      this.filterSubCategory(this.local.getObject(category), callback);
    }
  }

  private filterSubCategory(topics: Topic[], callback: any) {
    const subTopics = [];
    topics.forEach(item => {
      subTopics.push({
        displayName: item.displayName,
        topicID: item.topicId,
        filterable: item.filterable
      });
    });
    callback(subTopics);
  }

  public getSubTopicByTopicID(category: string, topicID: string, callback: any) {
    if (Utils.isEmpty(this.local.getObject(category))) {
      this.getTopicByCategory(category, resp => {
        resp.forEach(topic => {
          if (topic.topicId === topicID) {
            callback(topic.subTopic);
          }
        });
      });
    } else {
      this.local.getObject(category).forEach(topic => {
        if (topic.topicId === topicID) {
          callback(topic.subTopic);
        }
      });
    }
  }

  public getTopicPromotionByTopicId(category: string, topicId: string, callback: any) {
    const topics = this.local.getObject(category);
    if (Utils.isEmpty(topics)) {
      this.getPromotionFromServer(topicId, callback);
    } else {
      topics.forEach(topic => {
        if (topic.topicId === topicId) {
          callback(topic.recommendFeeds);
        }
      });
    }
  }

  private getPromotionFromServer(topic: string, callback: any) {
    const url = environment.apiEndpoint + 'feed/v1/promotion?topic=' + topic;
    this.http.get(url, Utils.constructHeader()).map(res => res.json()).subscribe(resp => {
      if (resp.status === 200) {
        callback(resp.data);
      }
    });
  }
}

export class Topic {
  topicId: string;
  category: string;
  displayName: string;
  filterable: boolean;
  subTopic: SubTopic[];
  similarWords: string[];
  recommendFeeds: RecommendFeeds[];
}

export class SubTopic {
  topicId: string;
  displayName: string;
  similarWords: string[];
  enabled: boolean;
  readOnly: boolean;
}

export class RecommendFeeds {
  youtubeHost: string;
  title: string;
  thumbnail: string;
  viewCount: string;
  commentCount: string;
  likeCount: string;
  author: Author;
}

export class Author {
  avatar: string;
  displayName: string;
}
