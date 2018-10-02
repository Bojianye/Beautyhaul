import {Component, AfterViewInit, NgZone} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {CurrentUserService, UserInfo} from "../../services/currentUser.service";
import {environment} from "../../../environments/environment";
declare const gapi: any;

@Component({
  selector: 'google-login',
  templateUrl: './google.login.component.html',
  styleUrls: ['./login.btn.scss'],
  providers: [LoginService]
})

export class GoogleLoginComponent implements AfterViewInit {
  auth2: any;

  constructor(private loginService: LoginService,
              private currentUserService: CurrentUserService
  ) {

  }

  ngAfterViewInit() {
    var instance = this;
    var buttonNode = document.getElementById('glogin'),
      loginService = this.loginService;
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: environment.google_auth_client_id,
        cookiepolicy: 'single_host_origin'
      });
      this.auth2.attachClickHandler(buttonNode, {},
        function (loggedInUser) {
          loginService.login({
            'authToken': loggedInUser.getAuthResponse().id_token,
            'appClientId': environment.google_auth_client_id,
            'source': "GOOGLE"
          }, function (data) {
              instance.currentUserService.login(<UserInfo>data['data']['userInfo']);
          });
        },
        function (error) {
          if (console) {
            console.log('login faile: ' + error);
          }
        });
    });
  }

}
