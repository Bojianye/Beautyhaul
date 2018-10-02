import { Component, AfterContentInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  moduleId : module.id,
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls : ['./content.style.scss']
})
export class AboutComponent {
  facebookLink : string = environment.facebookLink;
  constructor() {

  }
}
