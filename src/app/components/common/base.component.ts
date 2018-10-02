/**
 * Created by robert on 8/07/17.
 */
import {Component, OnDestroy, OnInit} from "@angular/core";
import {RouterHistoryService} from "../../services/router.history.service";
import {Router} from "@angular/router";

@Component({
  providers: [],
  templateUrl: './base.component.html'
})

export class BaseComponent implements OnInit, OnDestroy {

  private _subcribe: any;


  constructor(private _history: RouterHistoryService,
              private _router: Router,
              private _title: string) {
    this._subcribe = _router.events.pairwise()
      .subscribe((e) => {
        _history.push(e, _title);
      });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._subcribe.unsubscribe();
  }
}
