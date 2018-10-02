import {Component, HostListener, Inject, NgZone, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FeedService} from '../../services/feed.service';
import {GtmService} from "../../services/gtm.service";
import {RouterHistoryService} from "../../services/router.history.service";
import {BaseComponent} from "../common/base.component";
import {TopicService} from "../../services/topic.service";
import {FilterService} from "../../services/filter.service";
import {SessionStorageService} from "../../services/sessionStorage.service";
import {PageScrollInstance, PageScrollService} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/common";

@Component({
  moduleId: module.id,
  selector: 'video-list',
  templateUrl: 'video.list.component.html',
  styleUrls: ['./video.list.style.scss', '../styles/video.card.style.scss'],
  providers: [GtmService, FeedService, TopicService, FilterService]
})

export class VideoListComponent extends BaseComponent implements OnInit, OnDestroy {
  subscription: any;
  moreData = true;
  feeds: Feed[];
  filterTitle = 'Filter';
  categoryId: string;

  nextPageToken: string;

  isShowMoreLoading: boolean;

  isLoading: boolean;

  hasFeeds: boolean;
  currentCategory: string;
  currentTopic: string;
  title: string;
  topicList: any;

  constructor(private routeParams: ActivatedRoute,
              private localSession: SessionStorageService,
              private ngZone: NgZone,
              private router: Router,
              private filter: FilterService,
              private historyService: RouterHistoryService,
              private topicService: TopicService,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
    super(historyService, router, '');
    this.feeds = [];
    this.isShowMoreLoading = false;
    this.isLoading = false;
    this.hasFeeds = true;
  }

  @HostListener('window:scroll', ['$event'])
  scroll(event) {
    const pageYOffset = window.pageYOffset;
    const documentHeight = document.documentElement.offsetHeight;
    const windowHeight = document.documentElement.clientHeight;
    if (pageYOffset + windowHeight > documentHeight - 500) {
      if (!this.isLoading) {
        this.isLoading = true;
        this.loadData(this.currentTopic);
      }
    }
  }

  ngOnInit() {
    this.subscription = this.routeParams.params.subscribe(params => {
      this.feeds = [];
      this.constructorParams(params);
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.subscription.unsubscribe();
  }

  private constructorParams(params: any) {
    this.currentCategory = params['catId'];
    this.currentTopic = params['topID'];
    this.topicService.getSubTopicByCategory(this.currentCategory, topics => {
      this.topicList = [];
      topics.forEach(topic => {
        if (topic.topicID === this.currentTopic) {
          if (topic && topic.filterable === false) {
            this.filterTitle = '';
          }
        }
        const item = {
          selected: topic.topicID === this.currentTopic,
          displayName: topic.displayName.toUpperCase(),
          topicID: topic.topicID
        };
        this.topicList.push(item);
      });
      this.title = this.currentCategory.toUpperCase();
      this.nextPageToken = null;
      const cacheData = this.localSession.getObject('video-list');
      if (this.isEmpty(cacheData)) {
        if (!this.filter.hasFilter(this.currentTopic)) {
          this.topicService.getTopicPromotionByTopicId(this.currentCategory, this.currentTopic, feeds => {
            if (feeds) {
              this.feeds = feeds;
            }
            this.loadData(this.currentTopic);
          });
        } else {
          this.loadData(this.currentTopic);
        }
      } else {
        this.localSession.remove('video-list');
        this.feeds = cacheData.feeds;
        this.nextPageToken = cacheData.nextPageToken;
        setTimeout(() => {
          const scrollConfig = {
            document: this.document,
            scrollTarget: '#' + cacheData.feedId,
            pageScrollDuration: 0,
            pageScrollOffset: 100,
            defaultIsVerticalScrolling: false
          };
          const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance(scrollConfig);
          this.pageScrollService.start(pageScrollInstance);
        }, 50);
      }
    });
  }

  private loadData(topicID: string) {
    if (this.moreData) {
      if (!this.nextPageToken) {
        this.isLoading = true;
      }
      this.filter.filterByTopic(topicID, this.nextPageToken, resp => {
        this.ngZone.run(() => {
          this.nextPageToken = resp.nextPageToken;
          if (!this.nextPageToken) {
            this.moreData = false;
          }
          if (resp.data) {
            this.feeds = this.feeds.concat(resp.data);
          }
          this.hasFeeds = this.feeds.length > 0;
          this.isLoading = false;
        });

      });
    }else {
      this.isLoading = false;
    }
  }

  showMore() {
    this.loadData(this.currentTopic);
  }

  selectTag(topic: any) {
    if (topic.topicID === this.currentTopic) {
      return;
    }
    this.feeds = [];
    this.router.navigate(['/videos', this.currentCategory, topic.topicID]);
  }

  filterBtnDidClicked() {
    this.router.navigate(['filter'], {queryParams: {topic: this.currentTopic, category: this.currentCategory}});
  }

  linkFeed(feedID: string) {
    const cacheData = {
      feeds: this.feeds,
      feedId: feedID,
      nextPageToken: this.nextPageToken
    };
    this.localSession.setObject('video-list', cacheData);
    this.router.navigate(['/feed', feedID]);
  }

  isEmpty(obj) {
    for (var name in obj) {
      return false;
    }
    return true;
  };
}

interface Feed {
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
