/**
 * Created by robert on 6/07/17.
 */
import {Injectable} from '@angular/core';
import {NavigationEnd, NavigationStart} from "@angular/router";
import {SessionStorageService} from "./sessionStorage.service";
import {Utils} from "../common/Utils";

@Injectable()
export class RouterHistoryService {
  private routerStack: any[];
  private lastPopRoute: any;

  constructor(private sessionStorage: SessionStorageService) {
    this.routerStack = [];
  }

  public push(e: any, title: string) {
    // only record path when leave the page
    if (!(e[0] instanceof NavigationEnd && e[1] instanceof NavigationStart)) {
      return;
    }
    const from = <NavigationEnd>e[0];
    const to = <NavigationStart>e[1];
    let fromUrl = from.url;
    if (fromUrl === '/') {
      fromUrl = '/homepage/foryou';
    }
    let toUrl = to.url;
    if (toUrl === '/') {
      toUrl = '/homepage/foryou';
    }

    // 1. Do not put login page in history
    if (fromUrl === '/login') {
      return;
    }

    // 2.back to previous page
    if (this.lastPopRoute && this.lastPopRoute.url[0] === toUrl) {
      return;
    }

    // 3.jump in same level of child route
    const toBaseUrl = this.getBaseUrl(toUrl);
    const fromBaseUrl = this.getBaseUrl(fromUrl);
    if (toBaseUrl === fromBaseUrl && fromBaseUrl !== '') {
      return;
    }

    // Final: enter the stack
    this.getRouteStack();
    this.routerStack.push({
      url: [fromUrl],
      title: title
    });
    this.sessionStorage.setObject('router_history', this.routerStack);
  }

  private getBaseUrl(urlStr: string) {
    const urlArray = urlStr.split('/');
    const lastPart = urlArray[urlArray.length - 1];
    return urlStr.substring(0, urlStr.length - lastPart.length - 1);
  }

  public popLastHistory(): RouterInfoModel {
    this.getRouteStack();
    if (this.routerStack.length > 0) {
      this.lastPopRoute = this.routerStack.pop();
    } else {
      this.lastPopRoute = {
        url: ['/'],
        title: ''
      };
    }
    this.sessionStorage.setObject('router_history', this.routerStack);
    return this.lastPopRoute;
  }

  private getRouteStack() {
    this.routerStack = this.sessionStorage.getObject('router_history');
    if (Utils.isEmpty(this.routerStack)) {
      this.routerStack = [];
    }
  }

  public getLastHistory(): RouterInfoModel {
    let item: any;
    this.getRouteStack();
    if (this.routerStack.length > 0) {
      item = this.routerStack.pop();
      this.routerStack.push(item);
    } else {
      item = {
        url: ['/'],
        title: ''
      };
    }
    return item;
  }
}

export class RouterInfoModel {
  url: Array<string>;
  title: string;
}
