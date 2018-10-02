/**
 * Created by robert on 12/06/17.
 */
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {LocalStorageService} from "./localStorage.service";
import {RouterHistoryService} from "./router.history.service";
import {Utils} from "../common/Utils";


@Injectable()
export class CurrentUserService {
  public redirectUrl: string;

  constructor(private router: Router,
              private history: RouterHistoryService,
              private local: LocalStorageService) {

  }

  public login(userInfo: UserInfo) {
    this.local.setObject('currentUser', userInfo);
    this.router.navigate(this.history.popLastHistory().url);
  }

  public getUserInfo(): UserInfo {
    let userInfo = this.local.getObject('currentUser');
    if (!userInfo) {
      userInfo = new UserInfo();
    }
    return userInfo;
  }

  public updateUserInfo(userInfo: any) {
    const currentInfo = this.getUserInfo();
    currentInfo.firstName = userInfo.person.firstName;
    currentInfo.lastName = userInfo.person.lastName;
    this.local.setObject('currentUser', currentInfo);

  }

  public logout(): void {
    this.local.remove('currentUser');
  }

  public checkLogin(): boolean {
    const userInfo = this.getUserInfo();
    if (Utils.isEmpty(userInfo)) {
      return false;
    } else {
      return true;
    }
  }

}

export class UserInfo {
  public jwtToken: string;
  public avatar: string;
  public email: string;
  public externalUserId: string;
  public firstName: string;
  public lastName: string;
  public name: string;
  public source: string;
}
