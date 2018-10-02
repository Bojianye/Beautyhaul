import {Component, AfterViewInit, NgZone} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {CurrentUserService, UserInfo} from "../../services/currentUser.service";
declare const FB: any;

@Component({
  selector: 'facebook-login',
  templateUrl: './facebook.login.component.html',
  providers: [LoginService],
  styleUrls: ['./login.btn.scss'],
})

export class FacebookLoginComponent implements AfterViewInit {

  constructor(private loginService: LoginService,
              private currentUserService: CurrentUserService
  ) {

  }

  ngAfterViewInit() {
  }

  loginFaceBook() {
    const self = this;
    const loginService = this.loginService,
      openFBLoginDialog = function () {
        FB.login(function (response) {
            if (response.authResponse && response.authResponse.accessToken) {
              loginService.login({
                'authToken': response.authResponse.accessToken,
                'source': "FACEBOOK"
              }, function (data) {
                self.currentUserService.login(<UserInfo>data['data']['userInfo']);
              });
            }
          }, {scope: 'email,public_profile'}
        );
      };

    FB.getLoginStatus(function (response) {
      if (response && !response.error && response.status && response.status === 'connected') {
        //user may already log into facebook from other application. So we only need to generate our JWT token form them
        // without going to facebook login dialog.
        if (response.authResponse && response.authResponse.accessToken) {
          loginService.login({
            'authToken': response.authResponse.accessToken,
            'source': "FACEBOOK"
          }, function (data) {
            self.currentUserService.login(<UserInfo>data['data']['userInfo']);
          });
        } else {
          openFBLoginDialog();
        }
      } else {
        openFBLoginDialog();
      }
    }, false);
  }

}
