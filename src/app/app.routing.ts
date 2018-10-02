import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {VideoListComponent} from "./components/video/video.list.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {FeedViewComponent} from "./components/feed/feed.view.component";
import {AboutComponent} from "./components/content/about.component";
import {ContactComponent} from "./components/content/contact.component";
import {PrivacyComponent} from "./components/content/privacy.component";
import {UserInfoComponent} from "./components/profile/userInfo.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./services/auth.guard";
import {FilterComponent} from "./components/common/filter.component";
import {ForYouComponent} from "./components/homepage/foryou/foryou.component";
import {MakeupComponent} from "./components/homepage/makeup/makeup.component";
import {TrendingComponent} from "./components/homepage/trending/trending.component";
import {ProfileComponent} from "./components/profile/profile.component";

const appRoutes: Routes = [
  {path: '', redirectTo: 'homepage', pathMatch: 'full'},
  {path: 'videos', component: VideoListComponent},
  {path: 'videos/:catId/:topID', component: VideoListComponent},
  {
    path: 'homepage', component: HomepageComponent, children: [
    {path: '', redirectTo: 'foryou', pathMatch: 'full'},
    {path: 'foryou', component: ForYouComponent},
    {path: 'makeup', component: MakeupComponent},
    {path: 'skincare', component: MakeupComponent},
    {path: 'trending', component: TrendingComponent},
  ]
  },
  {path: 'feed/:feedId', component: FeedViewComponent},

  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'privacy', component: PrivacyComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'userInfo',
    component: UserInfoComponent,
    canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'filter', component: FilterComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: false});
