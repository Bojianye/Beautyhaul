import {Component, Input, AfterContentInit, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {CurrentUserService, UserInfo} from "../../services/currentUser.service";
import {LoginService} from "../../services/login.service";
import {UserProfileService} from "../../services/userProfile.service";

@Component({
  selector: 'header-navigation',
  templateUrl: 'header.navigation.component.html',
  styleUrls: ['./header.navigation.style.scss'],
  providers: [CurrentUserService, LoginService],
})

export class HeaderNavigationComponent implements AfterContentInit, OnInit {

  _opened: boolean = false;

  version: string = environment.version;

  poweredBy: string = environment.poweredBy;

  copyrightYear: string = environment.copyrightYear;

  dropdown = false;

  userInfo: UserInfo;

  isLogin: boolean = false;

  @Input()
  title: string;

  @Input()
  recommendActive: string = '';

  @Input()
  exploreActive: string = '';

  constructor(private router: Router,
              private userProfile: UserProfileService,
              private userService: CurrentUserService) {


  }

  ngOnInit() {
    this.userInfo = this.userService.getUserInfo();
    this.isLogin = this.userService.checkLogin();

  }

  ngAfterContentInit() {

  }


  link(routerPath: string) {
    this.router.navigate([routerPath]);
  }

  login() {
    this._opened = false;
    this.router.navigate(['login']);

  }

  logout() {
    this._opened = false;
    this.isLogin = false;
    this.userService.logout();
    this.userProfile.clearCache();
    this.router.navigate(['']);
  }

  loginBtnDidClicked() {
    this.router.navigate(['profile']);
  }


  contactBtnDidClicked() {
    this.router.navigate(['contact']);
  }

  aboutUsBtnDidClicked() {
    this.router.navigate(['about']);
  }

  privacyBtnDidClicked() {
    this.router.navigate(['privacy']);
  }

  downloadBtnDidClicked() {
    console.log('navigate to download page');
  }

  showDropDown() {
    this.dropdown = !this.dropdown;
  }
}
