import {Injectable, NgZone} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";
import "rxjs/add/operator/map";
import {Subject} from "rxjs/Subject";
import {MessageService} from "./message.service";
import {LeoNotificationService} from "./notifications.service";
import {Utils} from "../common/Utils";

@Injectable()
export class LoginService {
  private subject = new Subject<any>();

  constructor(private http: Http,
              private messageService: MessageService,
              private zone: NgZone,
              private noti: LeoNotificationService) {

  }

  login(user: any, callback: any) {
    let body = JSON.stringify(user);
    var url = environment.apiEndpoint + "/auth/v1/login";
    this.http.post(url, body, Utils.constructHeader()).map(
      res => res.json()
    ).subscribe(
      data => {
        this.zone.run(() => {
          const status = data['status'];
          if (status === 200) {
            this.messageService.sendMessage('isLoggedIn');
            // this.noti.postSucceed('Login', data.msg);
            callback(data);
          } else {
              this.noti.postError('Error', data.msg);
          }

        });
      }
    );
  }

  /**
   * Create login status observable. Other components can subscribe it to determine your action based one login status.
   * It is handy to communicate with different component after user loggged in.
   * eg: this.subscription = this.loginService.getLoginStatus().subscribe(status => yourCallbackFunction(status); });
   * please ensure you unsbscribe it after your component is destroyed.
   * eg:
   * ngOnDestroy() {
  *      // unsubscribe to ensure no memory leaks
  *      this.subscription.unsubscribe();
  * }
   */
  // getLoginStatus(): Observable<any> {
  //   return this.subject.asObservable();
  // }

  logout() {
    this.subject.next({'isLoggedIn': false});
  }

}
