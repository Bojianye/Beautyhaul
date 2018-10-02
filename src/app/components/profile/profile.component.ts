/**
 * Created by robert on 7/07/17.
 */
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {RouterHistoryService} from "../../services/router.history.service";
import {BaseComponent} from "../common/base.component";
import {UserProfileService} from "../../services/userProfile.service";
import {CurrentUserService} from "../../services/currentUser.service";
import {LocalStorageService} from "../../services/localStorage.service";
import {SessionStorageService} from "../../services/sessionStorage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  // animations: [slideInDownAnimation]
})
export class ProfileComponent extends BaseComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  // @HostBinding('style.display') display = 'block';

  public userInfo;

  public feeds = [];

  constructor(private router: Router,
              private currentUser: CurrentUserService,
              private local: LocalStorageService,
              private session: SessionStorageService,
              private profile: UserProfileService,
              private history: RouterHistoryService) {
    super(history, router, 'Profile');
  }

  ngOnInit() {
    this.userInfo = this.currentUser.getUserInfo();
    this.profile.getUserBookmarks(resp => {
      this.feeds = resp;
    });

  }

  editProfile() {
    this.router.navigate(['userInfo']);
  }

  closedBtnDidClicked() {
    this.router.navigate(this.history.popLastHistory().url);
  }

  linkFeed(feed: any) {
    this.router.navigate(['/feed', feed.id]);
  }

  logout() {
    this.currentUser.logout();
    this.profile.clearCache();
    this.local.clean();
    this.session.clean();
    this.router.navigate(['']);
  }

}
