import { Component, Input } from '@angular/core';
import { FeedCardBaseComp } from './feed.card.base';


@Component({
  moduleId: module.id,
  selector: 'feed-card-medium',
  templateUrl: './feed.card.medium.html',
  styleUrls : ['feed.card.scss'],
})
export class FeedCardMediumComp extends FeedCardBaseComp {

}