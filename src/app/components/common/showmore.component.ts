import { Component, Input, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { GtmService } from '../../services/gtm.service';

@Component({
  moduleId : module.id,
  selector: 'show-more',
  styleUrls : ['showmore.style.scss'],
  templateUrl: './showmore.component.html',
  providers: [GtmService]
})

export class ShowMoreComponent  {

  @Input()
  content : string = "";

  description : string = "";

  isShowMore : boolean = false;

  isDisplayShowMore : boolean = false;

  constructor(private gtmService : GtmService) {}

  ngOnChanges(changes: SimpleChanges) {
        // only run when property "data" changed
        if (changes['content']) {
            this.initDescription(this.content);
        }
    }

  initDescription(contentData) {
    this.isShowMore = contentData.length > 200;
    if (this.isShowMore) {
      this.description = contentData.substring(0, 200) + '...';
      this.isDisplayShowMore = true;
    } else {
      this.description = contentData;
      this.isDisplayShowMore = false;
    }
  }

  toggleShowMore() {
    if (this.isShowMore) {
      this.description = this.content;
    } else {
      this.description = this.content.substring(0, 200) + '...';
    }
    this.isShowMore = !this.isShowMore;
    this.gtmService.sendGeneralEvent("showmore-btn", "click", this.isShowMore ? "more" : "less");
  }

}
