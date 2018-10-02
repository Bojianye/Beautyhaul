import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeCommentsService {

  YOUTUBE_COMMENTS_REST_URL : string;

  constructor (private http : Http) {
    this.YOUTUBE_COMMENTS_REST_URL = environment.youtubeApiEndpoint + "/commentThreads?part=snippet,replies";
  }

  getComments(videoId: string, nextPageToken: string) {
    var query = "&videoId=${videoId}&key=${clientKey}&pageToken=${nextPageToken}";
    query = query.replace("${videoId}", videoId);
    query = query.replace("${clientKey}", environment.youtubeApiKey);
    query = query.replace("${nextPageToken}", nextPageToken);

    return this.http.get(this.YOUTUBE_COMMENTS_REST_URL + query)
      .map(res => res.json());
  }
}
