import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {routing} from "./app.routing";
// ng bootstrap latest
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
// ng swiper
import {SwiperModule} from "angular2-useful-swiper";
// Pipe
import {CountDisplayPipe} from "./pipes/count.display.pipe";
import {StringLimitPipe} from "./pipes/string.limit.pipe";
import {SafeUrlPipe} from "./pipes/safeUrl.pipe";
import {SafeImagePipe} from "./pipes/safeImage.pipe";
import {KeysPipe} from "./pipes/keys.pipe";
import {HtmlBreakPipe} from "./pipes/html.break.pipe";
import {HtmlLinkRemovePipe} from "./pipes/html.link.remove.pipe";
import {NameAvatarPipe} from "./pipes/name.avatar.pipe";
// Component
import {AppComponent} from "./app.component";
import {ShowMoreComponent} from "./components/common/showmore.component";
import {HeaderNavigationComponent} from "./components/common/header.navigation.component";
import {HeaderCloseComponent} from "./components/common/header.close.component";
import {SocialShareComponent} from "./components/common/social.share.component";
import {GoogleLoginComponent} from "./components/login/google.login.component";
import {FacebookLoginComponent} from "./components/login/facebook.login.component";
import {VideoListComponent} from "./components/video/video.list.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {FeedViewComponent} from "./components/feed/feed.view.component";
import {AboutComponent} from "./components/content/about.component";
import {ContactComponent} from "./components/content/contact.component";
import {PrivacyComponent} from "./components/content/privacy.component";
import {UserInfoComponent} from "./components/profile/userInfo.component";
import {LocalStorageService} from "./services/localStorage.service";
import {CurrentUserService} from "./services/currentUser.service";
import {LoginComponent} from "./components/login/login.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "./services/message.service";
import {LeoNotificationService} from "./services/notifications.service";
import {AuthGuard} from "./services/auth.guard";
import {UserProfileService} from "./services/userProfile.service";
import {BaseComponent} from "./components/common/base.component";
import {FeedCardBaseComp} from "./components/card/feed.card.base";
import {PageNotFoundComponent} from "./components/common/404.component";
import {
  MdButtonToggleModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdNativeDateModule,
  MdRadioModule,
  MdSelectModule,
  MdTabsModule
} from "@angular/material";
import {FilterComponent} from "./components/common/filter.component";
import {ProductComponent} from "./components/product/product.component";
import {ForYouComponent} from "./components/homepage/foryou/foryou.component";
import {MakeupComponent} from "./components/homepage/makeup/makeup.component";
import {TrendingComponent} from "./components/homepage/trending/trending.component";
import {SearchComponent} from "./components/search/search.component";
import {NavigationBarComponent} from "./components/common/navigationBar.component";
import {RouterHistoryService} from "./services/router.history.service";
import {ProfileComponent} from "./components/profile/profile.component";
import {FeedVideoViewComp} from "./components/feed/feed.video.view.comp";
import {FeedMixViewComp} from "./components/feed/feed.mix.view.comp";
import {FeedActionComp} from "./components/feed/feed.action.comp";
import {FeedCommentComp} from "./components/feed/feed.comment.comp";
import {FeedCardLargeComp} from "./components/card/feed.card.large";
import {FeedCardMediumComp} from "./components/card/feed.card.medium";
import {SessionStorageService} from "./services/sessionStorage.service";
import {FilterService} from "./services/filter.service";
import {AvatarViewComp} from "./components/avatar/avatar.view.comp";
import {Ng2PageScrollModule} from "ng2-page-scroll";

@NgModule({
  declarations: [
    AppComponent, ForYouComponent, MakeupComponent, TrendingComponent,
    CountDisplayPipe, StringLimitPipe, SafeUrlPipe, SafeImagePipe, KeysPipe, HtmlBreakPipe, HtmlLinkRemovePipe, NameAvatarPipe,
    ShowMoreComponent, HeaderNavigationComponent, HeaderCloseComponent, SocialShareComponent, GoogleLoginComponent, FacebookLoginComponent,
    VideoListComponent,
    HomepageComponent, FeedViewComponent, UserInfoComponent, NavigationBarComponent,
    AboutComponent, ContactComponent, PrivacyComponent, LoginComponent,
    FilterComponent, ProductComponent, SearchComponent, ProfileComponent,
    FeedCardLargeComp, FeedCardMediumComp, FeedVideoViewComp, FeedMixViewComp, FeedActionComp, FeedCommentComp,
    AvatarViewComp, BaseComponent, FeedCardBaseComp, PageNotFoundComponent
  ],
  imports: [
    MdIconModule,
    MdMenuModule,
    MdRadioModule,
    MdTabsModule,
    MdButtonToggleModule,
    MdInputModule,
    MdSelectModule,
    MdCheckboxModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdChipsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SwiperModule,
    NgbModule.forRoot(),
    Ng2PageScrollModule.forRoot()
    //MetaModule.forRoot()
  ],
  providers: [SessionStorageService, FilterService,
    LocalStorageService, CurrentUserService, MessageService,
    LeoNotificationService, AuthGuard, UserProfileService,
    RouterHistoryService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
