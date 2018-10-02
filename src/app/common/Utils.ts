import {RequestOptions, Headers} from "@angular/http";
import {environment} from "../../environments/environment";

export class Utils {
  /**
   * Construct request header
   * @param headers
   * @returns {RequestOptions}
   */
  public static constructHeader() {
    const header = new Headers({'Content-Type': 'application/json'});
    header.append(environment.apiKeyName, environment.apiKeyValue);
    const currentUserInfo = localStorage['currentUser'];
    if (currentUserInfo) {
      const currentUserObj = JSON.parse(currentUserInfo);
      const jwtToken = currentUserObj.jwtToken;
      header.append(environment.jwtKeyName, jwtToken);
    }
    return new RequestOptions({headers: header});
  }

  /**
   * Empty Object
   * @param obj
   * @returns {boolean}
   */
  public static isEmpty(obj) {
    for (var name in obj) {
      return false;
    }
    return true;
  };
}
