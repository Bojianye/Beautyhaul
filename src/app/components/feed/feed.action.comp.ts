import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {FeedModel} from "./FeedModel";
import {environment} from "../../../environments/environment";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FeedActionService} from "../../services/feedAction.service";
import {CurrentUserService} from "../../services/currentUser.service";
import {Router} from "@angular/router";
import { GtmService } from '../../services/gtm.service';

@Component({
  moduleId: module.id,
  selector: 'feed-action-view',
  templateUrl: 'feed.action.comp.html',
  styleUrls: ['feed.view.style.scss'],
  providers: [FeedActionService, GtmService]
})
export class FeedActionComp implements OnChanges, OnInit {
  isLike: boolean;
  isDislike: boolean;
  isBookmark: boolean;
  saveStatus = 'Save';
  @Input()
  feed: FeedModel;

  closeResult: string;

  constructor(private modalService: NgbModal,
              private router: Router,
              private currentUser: CurrentUserService,
              private feedAction: FeedActionService,
              private gtmService : GtmService) {

  }

  ngOnInit() {
    if (this.feed.userFeed.likeStatus === 'LIKE') {
      this.isLike = true;
      this.isDislike = false;
    } else {
      if (this.feed.userFeed.likeStatus === 'DISLIKE') {
        this.isLike = false;
        this.isDislike = true;
      } else {
        this.isLike = false;
        this.isDislike = false;
      }
    }
    this.isBookmark = this.feed.userFeed.bookMarked;
    if (this.isBookmark) {
      this.saveStatus = 'Saved';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['feed']) {

    }
  }

  facebookShare() {
    var facebookShareUrl = "https://www.facebook.com/sharer/sharer.php";
    facebookShareUrl += "?u=" + this.encodeUrl();
    this.gtmService.sendGeneralEvent("feed-action", "social-share", "facebook");
    window.open(facebookShareUrl);
    return true;
  }

  twitterShare() {
    var twitterShareUrl = "https://twitter.com/intent/tweet";
    twitterShareUrl += "?source=" + this.encodeUrl();
    twitterShareUrl += "&text=" + this.encodeContent(this.feed.title) + " from beautyhaul";
    this.gtmService.sendGeneralEvent("feed-action", "social-share", "twitter");
    window.open(twitterShareUrl);
    return true;
  }

  googleShare() {
    var googleShareUrl = "https://plus.google.com/share";
    googleShareUrl += "?url=" + this.encodeUrl();
    this.gtmService.sendGeneralEvent("feed-action", "social-share", "google");
    window.open(googleShareUrl);
    return true;
  }

  emailShare() {
    var emailUrl = "mailto:";
    emailUrl += "?subject=beautyhaul social share";

    var emailBody = this.encodeContent(this.feed.title);
    emailBody += " " + this.encodeUrl();
    emailUrl += "&body=" + emailBody;
    this.gtmService.sendGeneralEvent("feed-action", "social-share", "email");
    window.open(emailUrl);
    return true;
  }

  encodeUrl() {
    var url = environment.host;
    if (this.feed.id) {
      url += '/feed/' + this.feed.id;
    }
    return encodeURIComponent(url);
  }

  encodeContent(text) {
    return encodeURIComponent(text);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  likeButtonClicked() {
    if (this.currentUser.checkLogin()) {
      if (this.isLike) {
        this.feed.likeCount = this.feed.likeCount - 1;
        this.isLike = false;
      } else {
        if (this.isDislike) {
          this.feed.dislikeCount = '' + (parseInt(this.feed.dislikeCount, 10) - 1);
        }
        this.feed.likeCount = this.feed.likeCount + 1;
        this.isLike = true;
        this.isDislike = false;
      }
      this.gtmService.sendGeneralEvent("feed-action", "like", "success");
      this.feedAction.likeFeed(this.feed, resp => {});
    } else {
      this.gtmService.sendGeneralEvent("feed-action", "like", "login");
      this.router.navigate(['login']);
    }

  }

  unlikeButtonClicked() {
    if (this.currentUser.checkLogin()) {
      if (this.isDislike) {
        this.feed.dislikeCount = '' + (parseInt(this.feed.dislikeCount, 10) - 1);
        this.isDislike = false;
      } else {
        if (this.isLike) {
          this.feed.likeCount = this.feed.likeCount - 1;
        }
        this.feed.dislikeCount = '' + (parseInt(this.feed.dislikeCount, 10) + 1);
        this.isLike = false;
        this.isDislike = true;
      }
      this.gtmService.sendGeneralEvent("feed-action", "dislike", "success");
      this.feedAction.dislikeFeed(this.feed, resp => {});
    } else {
      this.gtmService.sendGeneralEvent("feed-action", "dislike", "login");
      this.router.navigate(['login']);
    }

  }

  bookmarkIt() {
    if (this.currentUser.checkLogin()) {
      if (this.isBookmark) {
        this.gtmService.sendGeneralEvent("feed-action", "bookmark", "unsaved");
        this.feedAction.notBookmark(this.feed, resp => {
        });
      } else {
        this.gtmService.sendGeneralEvent("feed-action", "bookmark", "saved");
        this.feedAction.bookmarkFeed(this.feed, resp => {
        });
      }
      this.isBookmark = !this.isBookmark;
      if (this.isBookmark) {
        this.saveStatus = 'Saved';
      } else {
        this.saveStatus = 'Save';
      }
    } else {
      this.gtmService.sendGeneralEvent("feed-action", "bookmark", "login");
      this.router.navigate(['login']);
    }
  }
}
