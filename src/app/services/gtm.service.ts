import { Injectable } from '@angular/core';

function _window() : any {
   // return the global native browser window object
   return window;
}

@Injectable()
export class GtmService {

  dataLayer : any;

  constructor() {
    this.dataLayer = this.getDataLayer();
  }

  private getDataLayer() : any {
      return _window().dataLayer;
   }

  sendGeneralEvent(category, action, label) {
    this.dataLayer.push({
      event : 'GAGeneralEvent',
      eventCategory : category,
      eventAction : action,
      eventLabel : label
    });
  }
}
