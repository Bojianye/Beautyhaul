import { Component, Input, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'social-share',
  templateUrl: 'social.share.component.html',
  styleUrls : ['./social.share.style.scss']
})
export class SocialShareComponent implements AfterContentInit  {

  closeResult: string;

  @Input()
  title : string;

  @Input()
  content : string;

  @Input()
  id : string;

  @Input()
  type : string;

  constructor(private modalService: NgbModal) {

  }

  facebookShare() {
    var facebookShareUrl = "https://www.facebook.com/sharer/sharer.php";
    facebookShareUrl += "?u=" + this.encodeUrl();
    window.open(facebookShareUrl);
    return true;
  }

  twitterShare() {
    var twitterShareUrl = "https://twitter.com/intent/tweet";
    twitterShareUrl += "?source=" + this.encodeUrl();
    twitterShareUrl += "&text=" + this.encodeContent(this.title) + " from beautyhaul";
    window.open(twitterShareUrl);
    return true;
  }

  googleShare() {
    var googleShareUrl = "https://plus.google.com/share";
    googleShareUrl += "?url=" + this.encodeUrl();
    window.open(googleShareUrl);
    return true;
  }

  emailShare() {
    var emailUrl = "mailto:";
    emailUrl += "?subject=beautyhaul social share";

    var emailBody = this.encodeContent(this.title);
    emailBody += " " + this.encodeUrl();
    emailUrl += "&body=" + emailBody;

    window.open(emailUrl);
    return true;
  }

  encodeUrl() {
    var url = environment.host;
    if (this.type === 'VIDEO' && this.id) {
      url += '/video/' + this.id;
    } else if (this.type === 'MIXED' && this.id) {
      url += '/feed/' + this.id;
    }
    return encodeURIComponent(url);
  }

  encodeContent(text) {
    return encodeURIComponent(text);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngAfterContentInit() {

  }
}
