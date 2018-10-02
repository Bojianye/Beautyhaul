import { Component, Input } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'avatar-view',
  templateUrl: './avatar.view.comp.html',
  styleUrls : ['avatar.view.style.scss'],
})
export class AvatarViewComp {
  
  @Input()
  name: string;

  @Input()
  imageSrc: string;

  @Input()
  sizeType: string = 'M';

  size : number = 48;

  fontTop : number;

  hasAvatarImageSrc : boolean;

  firstLetter : string;

  constructor() {
    
  }

  ngOnInit() {
    this.initAvatarSize(this.sizeType);
    this.hasAvatarImageSrc = this.imageSrc && this.imageSrc.trim().length > 0;
    if (!this.hasAvatarImageSrc && this.name && this.name.trim().length > 0) {
      this.firstLetter = this.name.trim().charAt(0);
    }
  }

  private initAvatarSize(sizeType : string) {
    if (sizeType === 'M') {
      this.size = 48;
      this.fontTop = 13;
    } else if (sizeType === 'S') {
      this.size = 32;
      this.fontTop = 5;
    } else if (sizeType === 'L') {
      this.size = 64;
      this.fontTop = 18;
    } else if (sizeType === 'XL') {
      this.size = 96;
      this.fontTop = 35;
    } else {
      this.size = 48;
      this.fontTop = 13;
    }
  }


}