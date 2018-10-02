import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit {
  // this is the workaround to make sure
  // the page route link is always onto the top
  constructor(private router: Router) {

  }

  ngOnInit() {
      // make sure the each router loading, the page scroll to the top.
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0);
      });
  }
}
