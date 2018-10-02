import { Component, AfterContentInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  moduleId : module.id,
  selector: 'contact',
  templateUrl: 'contact.component.html',
  styleUrls : ['./content.style.scss']
})
export class ContactComponent  {

 facebookLink : string = environment.facebookLink;
 constructor() {

 }
}
