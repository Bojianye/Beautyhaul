import {Component, OnDestroy, OnInit} from '@angular/core';
import {Feed, FeedService} from "../../../services/feed.service";
import {Router} from "@angular/router";
import {RouterHistoryService} from "../../../services/router.history.service";
import {Topic, TopicService} from "../../../services/topic.service";

@Component({
  selector: 'app-makeup',
  templateUrl: './makeup.component.html',
  styleUrls: ['./makeup.component.scss', '../../styles/video.card.style.scss'],
  providers: [TopicService]
})
export class MakeupComponent implements OnInit {
  nextPageToken: string;
  feeds: Feed[];
  isLoading: boolean;
  categories: any;
  swipeConfig: Object = {
    pagination: '.swiper-pagination',
    slidesPerView: 'auto',
    paginationClickable: true,
    spaceBetween: 0
  };
  showCategory: string;
  topics: Topic[];

  constructor(private router: Router,
              private topic: TopicService) {
  }

  ngOnInit() {
    const fromUrl = this.router.url;
    if (fromUrl === '/homepage/makeup') {
      this.showCategory = 'makeup';
    } else {
      this.showCategory = 'skincare';
    }
    this.isLoading = true;
    this.topic.getTopicByCategory(this.showCategory, resp => {
      if (resp.length > 0) {
        this.topics = resp;
      }
      this.isLoading = false;
    });

  }


  showMoreButtonDidClicked(category: string, topicID: string) {
    this.router.navigate(['/videos', category, topicID]);
  }

  videoItemClicked(videoID: string) {
  }
}
