/**
 * Created by robert on 19/06/17.
 */
import {Injectable} from "@angular/core";

@Injectable()
export class LeoNotificationService {
  constructor() {

  }

  public postSucceed(title: string, message: string) {
    // this.notification.success(title, message);
  }

  public postError(title: string, message: string) {
    // this.notification.error(title, message);
  }

  public postInfo(title: string, message: string) {
    // this.notification.info(title, message);
  }
}
