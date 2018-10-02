/**
 * Created by robert on 5/07/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {RouterHistoryService, RouterInfoModel} from "../../services/router.history.service";

@Component({
  selector: 'app-common-navigation-bar',
  templateUrl: './navigationBar.component.html',
  styleUrls: ['./navigationBar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  historyRouteInfo: RouterInfoModel;
  @Output() rightButton = new EventEmitter();
  @Input()
  title: string;
  @Input()
  buttonTitle: string;

  constructor(private router: Router,
              private history: RouterHistoryService) {
    this.historyRouteInfo = this.history.getLastHistory();
  }

  ngOnInit() {
  }

  back() {
    this.router.navigate(this.history.popLastHistory().url);
  }
  rightButtonDidClicked() {
    this.rightButton.emit();
  }
}
