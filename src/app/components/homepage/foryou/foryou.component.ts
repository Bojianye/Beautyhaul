import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {Feed, FeedService} from "../../../services/feed.service";
import {FilterService} from "../../../services/filter.service";
import {SessionStorageService} from "../../../services/sessionStorage.service";
import {PageScrollInstance, PageScrollService} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";
import {Utils} from "../../../common/Utils";

@Component({
  selector: 'app-for-you',
  templateUrl: './foryou.component.html',
  styleUrls: ['./foryou.component.scss', '../../styles/video.card.style.scss']
})
export class ForYouComponent implements OnInit {

  nextPageToken: string;
  feeds: Feed[];
  hasVideos: boolean;
  isLoading: boolean;
  moreData = true;

  constructor(private filterService: FilterService,
              private localSession: SessionStorageService,
              private router: Router,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) {
  }

  @HostListener('window:scroll', ['$event'])
  scroll(event) {
    const pageYOffset = window.pageYOffset;
    const documentHeight = document.documentElement.offsetHeight;
    const windowHeight = document.documentElement.clientHeight;
    if (pageYOffset + windowHeight > documentHeight - 500) {
      if (!this.isLoading) {
        this.loadData();
      }
    }
  }

  ngOnInit() {
    this.feeds = [];
    this.hasVideos = true;
    const cacheData = this.localSession.getObject('for_you');
    if (Utils.isEmpty(cacheData)) {
      this.loadData();
    } else {
      this.localSession.remove('for_you');
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
  }

  loadData() {
    if (this.moreData) {
      this.isLoading = true;
      this.filterService.filterForYou(this.nextPageToken, resp => {
        this.isLoading = false;
        this.nextPageToken = resp.nextPageToken;
        if (!this.nextPageToken) {
          this.moreData = false;
        }
        if (resp.data) {
          this.feeds = this.feeds.concat(resp.data);
        }
        this.hasVideos = this.feeds !== {};
      });
    }
  }


  linkFeed(feedID: string) {
    const cacheData = {
      feeds: this.feeds,
      feedId: feedID,
      nextPageToken: this.nextPageToken
    };
    this.localSession.setObject('for_you', cacheData);
    this.router.navigate(['/feed', feedID]);
  }
}



