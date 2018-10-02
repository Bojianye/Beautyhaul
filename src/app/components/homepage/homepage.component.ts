import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {BaseComponent} from "../common/base.component";
import {RouterHistoryService} from "../../services/router.history.service";
import "rxjs/add/operator/filter";

@Component({
  moduleId: module.id,
  selector: 'recommend',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.style.scss', '../styles/video.card.style.scss'],
})

export class HomepageComponent extends BaseComponent implements OnInit {
  activeLinkIndex: number;

  constructor(private router: Router,
              private history: RouterHistoryService) {
    super(history, router, 'Home');
    router.events
      .filter(e => e instanceof NavigationEnd)
      .forEach(e => {
        const a = <NavigationEnd>e;
        const routerUrl = a.urlAfterRedirects;
        if (routerUrl === '/homepage/foryou') {
          this.activeLinkIndex = 1;
        }
        if (routerUrl === '/homepage/makeup') {
          this.activeLinkIndex = 2;
        }
        if (routerUrl === '/homepage/skincare') {
          this.activeLinkIndex = 3;
        }
        if (routerUrl === '/homepage/trending') {
          this.activeLinkIndex = 4;
        }
      });
  }

  ngOnInit() {
  }
}
