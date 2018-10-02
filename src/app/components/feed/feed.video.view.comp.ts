import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import { FeedModel } from './FeedModel';

@Component({
  moduleId : module.id,
  selector: 'feed-video-view',
  templateUrl: 'feed.video.view.comp.html',
  styleUrls : ['feed.view.style.scss'],
  providers : [ FeedService ]
})
export class FeedVideoViewComp {
    
    @Input()
    feed : FeedModel;

    videoId : string;

    ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['feed']) {
          if (this.feed.type === 'VIDEO') {
            this.videoId = this.feed.sections[0].content;
            this.feed.videoUrl = this.feed.youtubeHost + this.videoId;
          }
        }
    }
}