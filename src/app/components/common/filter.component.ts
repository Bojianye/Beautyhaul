/**
 * Created by robert on 26/06/17.
 */
import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TopicService, Topic, SubTopic} from "../../services/topic.service";
import {SessionStorageService} from "../../services/sessionStorage.service";
import {RouterHistoryService} from "../../services/router.history.service";
import { GtmService } from "../../services/gtm.service";
import {Utils} from "../../common/Utils";


@Component({
  selector: 'app-feed-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [TopicService, GtmService],
})

export class FilterComponent implements OnInit, OnDestroy {
  sub: any;
  topic: string;
  filterList: Topic[];
  category: string;
  public selectFilter;

  constructor(private router: Router,
              private history: RouterHistoryService,
              private sessionStorage: SessionStorageService,
              private topicService: TopicService,
              private route: ActivatedRoute,
              private gtmService : GtmService) {

  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.topic = params.topic;
        this.category = params.category;
        this.constractSubTopic();
      });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private constractSubTopic() {
    this.topicService.getSubTopicByTopicID(this.category, this.topic, topics => {
      this.reformaterFilterStructer(topics);
      const filterArray = this.sessionStorage.getObject('filter_key_words');
      if (!Utils.isEmpty(filterArray)) {
        filterArray.forEach(item => {
          if (item.topic === this.topic) {
            this.selectFilter = item.subTopic;
          }
        });
      }
    });
  }

  reformaterFilterStructer(topics: SubTopic[]) {
    const topicList = [];
    topics.forEach(topic => {
      if (topic.readOnly === true) {
        topicList.push(topic);
      } else {
        const item = {
          displayName: '',
          subTopic: [topic]
        };
        topicList.push(item);
      }
    });

    this.filterList = topicList;
  }


  filterBtnDidClicked() {
    const filterArray = this.sessionStorage.getObject('filter_key_words');
    if (Utils.isEmpty(filterArray)) {
      if (this.selectFilter){
        this.sessionStorage.setObject('filter_key_words', [{
          topic: this.topic,
          subTopic: this.selectFilter
        }]);
        this.gtmService.sendGeneralEvent("filter", "search", this.topic + " - " + this.selectFilter);
      }
    } else {
      let found = false;
      filterArray.forEach(item => {
        if (item.topic === this.topic) {
          item.subTopic = this.selectFilter;
          found = true;
        }
      });
      if (!found && this.selectFilter) {
        filterArray.push({
          topic: this.topic,
          subTopic: this.selectFilter
        });
      }
      this.gtmService.sendGeneralEvent("filter", "search", this.topic + " - " + this.selectFilter);
      this.sessionStorage.setObject('filter_key_words', filterArray);
    }
    this.router.navigate(this.history.popLastHistory().url);
  }

  resetButtonClicked() {
    this.selectFilter = null;
    const filterArray = this.sessionStorage.getObject('filter_key_words');
    this.gtmService.sendGeneralEvent("filter", "reset", this.topic);
    if (Utils.isEmpty(filterArray)) {
      return;
    } else {
      const tempArray = [].concat(filterArray);
      for (let i = 0; i < tempArray.length; i++) {
        const item = tempArray[i];
        if (item.topic === this.topic) {
          filterArray.splice(i, 1);
        }
      }
      this.sessionStorage.setObject('filter_key_words', filterArray);
    }
  }

}
