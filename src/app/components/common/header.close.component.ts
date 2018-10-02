import {Component, EventEmitter, Input, Output} from "@angular/core";
import "rxjs/add/operator/pairwise";
import {RouterHistoryService} from "../../services/router.history.service";
import {Router} from "@angular/router";

@Component({
  selector: 'header-close',
  templateUrl: 'header.close.component.html',
  styleUrls: ['./header.close.style.scss'],
  providers: []
})
export class HeaderCloseComponent {
  @Output() rightButton = new EventEmitter();
  @Input()
  categoryId: string;

  @Input()
  title: string;

  @Input()
  buttonTitle: string;

  constructor(private history: RouterHistoryService,
              private router: Router) {

  }

  close() {
    this.router.navigate(this.history.popLastHistory().url);
  }

  rightButtonDidClicked() {
    // this.messageService.sendMessage('edit');
    this.rightButton.emit();
  }
}
