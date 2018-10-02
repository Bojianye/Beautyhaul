/**
 * Created by robert on 21/06/17.
 */
import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";
import {CurrentUserService} from "./currentUser.service";
import {FilterService} from "./filter.service";
import {Utils} from "../common/Utils";
@Injectable()
export class UserProfileService {
  private info: UserProfileModel;
  private profile: any;
  private list: PreferenceListModel;
  private bookmarks;

  constructor(private http: Http,
              private currentUser: CurrentUserService) {
  }

  public getUserInfo(callback) {
    const url = environment.apiEndpoint + "/user/v1/me";
    this.http.get(url, Utils.constructHeader()).map(res => res.json()).subscribe(response => {
      if (response.status === 200) {
        this.info = <UserProfileModel>response.data;
        callback(this.info);
      }
    });
  }

  public getUserBookmarks(callback) {
    const url = environment.apiEndpoint + '/feed/v1/bookmark';
    this.http.get(url, Utils.constructHeader()).map(res => res.json()).subscribe(response => {
      if (response.status === 200) {
        callback(response.data);
      }
    });
  }


  // 4 logout
  public clearCache() {
    this.list = null;
    this.info = null;
  }

  public getPreferenceList(callback) {
    if (this.list) {
      callback(this.list);
    } else {
      const url = environment.apiEndpoint + '/user/v1/preference/list';
      this.http.get(url, Utils.constructHeader()).map(res => res.json()).subscribe(response => {
        if (response.status === 200) {
          this.list = <PreferenceListModel>response.data;
          callback(this.list);
        }
      });
    }
  }

  public reloadData() {
    this.info = null;
  }

  public updateUserProfile(userInfo: any, callback: any) {
    const url = environment.apiEndpoint + '/user/v1/update';
    this.http.post(url, JSON.stringify(userInfo), Utils.constructHeader()).subscribe(resp => {
      callback(resp);
    });
  }
}

export class UserProfileModel {
  person: Person;
  contact: Contact;
  username: string;
  id: string;
  enable: boolean;
  useRoles: string[];

}

export class Person {
  firstName: string;
  lastName: string;
}

export class Contact {
  email: string;
  formattedStreet: string;
  formattedLocation: string;
}

export class PreferenceListModel {
  country: string[];

}


