import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FeedModel } from './FeedModel';

@Component({
  moduleId : module.id,
  selector: 'feed-mix-view',
  templateUrl: 'feed.mix.view.comp.html',
  styleUrls : ['feed.view.style.scss']
})
export class FeedMixViewComp {
    
    @Input()
    feed : FeedModel;

    videoId : string;

    ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['feed']) {
          
        }
    }
}