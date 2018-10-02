import {Component, HostBinding, NgZone, OnDestroy, OnInit} from "@angular/core";
import {CurrentUserService, UserInfo} from "../../services/currentUser.service";
import {UserProfileService} from "../../services/userProfile.service";
import {Subscription} from "rxjs/Subscription";
import {LeoNotificationService} from "../../services/notifications.service";
import {Router} from "@angular/router";
import {RouterHistoryService} from "../../services/router.history.service";
import {Utils} from "../../common/Utils";


@Component({
  selector: 'app-user-info',
  templateUrl: './userInfo.component.html',
  providers: [CurrentUserService],
  styleUrls: ['./userInfo.component.scss'],
})

export class UserInfoComponent implements OnInit {
  public title = 'Profile';
  public isLoading = false;
  public birthdayAlert = false;
  public userInfo: UserInfo;
  public editable = true;
  public countries;

  public userSkinConcern;

  public userExp;
  public userExpCode;
  public buttonTitle: string;
  public skinConcernsList;
  public expsList;
  public username;
  public meInfo;
  public oriSkinConcern;
  public skinConcernItemStaus = {};
  // user Infomation
  public userCountry;
  public userCountryCode;
  public userGender;
  public userGenderCode;
  public gendersList;
  public userBirthday;
  public firstname;
  public lastname;
  public email;
  // user Preference
  public isuserSkinConcern;

  public dayList = [];
  public userDay;
  public MonthList = [];
  public userMonth;
  public YearList = [];
  public userYear;

  constructor(private userProfile: UserProfileService,
              private history: RouterHistoryService,
              private currentUserService: CurrentUserService,
              private notification: LeoNotificationService,
              private ngZone: NgZone,
              private router: Router) {
    this.buttonTitle = 'SAVE';
  }

  saveButtonDidClicked() {

    // added name;
    this.meInfo.person.firstName = this.firstname;
    this.meInfo.person.lastName = this.lastname;

    // added Country
    this.countries.forEach(item => {
      if (item.code === this.userCountryCode) {
        this.meInfo.contact.country = {
          code: item.code,
          value: item.value
        };
      }
    });

    // added Gender
    this.gendersList.forEach(item => {
      if (item.code === this.userGenderCode) {
        this.meInfo.person.gender = {
          code: item.code,
          value: item.value
        };
      }
    });

    // added exp
    this.expsList.forEach(item => {
      if (item.code === this.userExpCode) {
        this.meInfo.userPreference.exp = {
          code: item.code,
          value: item.value
        };
      }
    });

    if (!(this.userDay === 0 && this.userMonth === 0 && this.userYear === 0)) {
      if (this.validateBirthday(this.userDay, this.userMonth, this.userYear)) {
        this.meInfo.person.dob = new Date(this.userYear, this.userMonth - 1, this.userDay).getTime();
      } else {
        this.birthdayAlert = true;
        return;
      }
    }

    // added skin concern
    const skinconcern = [];
    const keys = Object.keys(this.skinConcernItemStaus);
    keys.forEach(key => {
      if (this.skinConcernItemStaus[key]) {
        this.skinConcernsList.forEach(item => {
          if (item.code === key) {
            const concern = {
              code: item.code,
              value: item.value
            };
            skinconcern.push(concern);
          }
        });
      }
    });

    this.meInfo.userPreference.skinConcern = skinconcern;
    this.isLoading = true;
    this.userProfile.updateUserProfile(this.meInfo, resp => {
      this.isLoading = false;
      const response = JSON.parse(resp._body);
      if (response.status === 200) {
        this.currentUserService.updateUserInfo(this.meInfo);
        this.userProfile.reloadData();
        this.notification.postSucceed("User Profile", response.msg);
        this.router.navigate(this.history.popLastHistory().url);
      } else {
        this.notification.postError("User Profile", response.msg);
      }

    });

  }

  ngOnInit() {
    this.loadData();
    this.buttonTitle = 'SAVE';
    this.isLoading = true;
    this.userProfile.getPreferenceList(resp => {
      this.ngZone.run(() => {
        this.isLoading = false;
        this.countries = resp.countries;
        this.skinConcernsList = resp.skinConcerns;
        this.gendersList = resp.genders;
        this.expsList = resp.exps;
      });
    });
  }

  loadData() {
    this.isLoading = true;
    this.userInfo = this.currentUserService.getUserInfo();
    this.userProfile.getUserInfo(resp => {
      this.ngZone.run(() => {
        this.meInfo = JSON.parse(JSON.stringify(resp));
        this.initInterfaceValue(resp);
      });
    });
  }

  validateBirthday(day: number, month: number, year: number) {
    const date = new Date(year, month - 1, day);
    const newDay = date.getDate();
    const newMonth = date.getMonth();
    const newYear = date.getFullYear();
    return day === newDay && month === (newMonth + 1) && year === newYear;

  }

  initInterfaceValue(resp: any) {
    resp = this.initData(resp);
    this.isLoading = false;
    this.firstname = resp.person.firstName;
    this.lastname = resp.person.lastName;
    this.email = resp.contact.email;
    this.userGender = resp.person.gender.value;
    this.userGenderCode = resp.person.gender.code;
    this.userCountry = resp.contact.country.value;
    this.userCountryCode = resp.contact.country.code;
    this.userBirthday = resp.person.dob;
    this.userExp = resp.userPreference.exp.value;
    this.userExpCode = resp.userPreference.exp.code;
    this.userSkinConcern = resp.userPreference.skinConcern;
    this.username = resp.username;
    this.oriSkinConcern = resp.userPreference.skinConcern;
    if (this.oriSkinConcern) {
      this.oriSkinConcern.forEach(item => {
        this.skinConcernItemStaus[item.code] = true;
      });
    }
    if (!resp.person.dob) {
      this.userYear = 0;
      this.userMonth = 0;
      this.userDay = 0;
    }
  }

  initData(resp: any): any {
    if (!resp.person) {
      resp.person = {};
    }
    if (!resp.person.gender) {
      resp.person.gender = {};
    }
    if (!resp.contact) {
      resp.contact = {};
    }
    if (!resp.contact.country) {
      resp.contact.country = {};
    }
    if (!resp.userPreference) {
      resp.userPreference = {};
    }
    if (!resp.userPreference.exp) {
      resp.userPreference.exp = {};
    }
    if (!resp.userPreference.skinConcern) {
      resp.userPreference.skinConcern = {};
    }

    if (Utils.isEmpty(resp.userPreference.skinConcern)) {
      this.isuserSkinConcern = false;
    } else {
      this.isuserSkinConcern = true;
    }

    this.dayList = [];

    for (let i = 1; i <= 31; i++) {
      this.dayList.push(i);
    }
    this.MonthList = [];
    this.MonthList.push({
      code: 'Jan',
      value: 1
    });
    this.MonthList.push({
      code: 'Feb',
      value: 2
    });
    this.MonthList.push({
      code: 'Mar',
      value: 3
    });
    this.MonthList.push({
      code: 'Apr',
      value: 4
    });
    this.MonthList.push({
      code: 'May',
      value: 5
    });
    this.MonthList.push({
      code: 'Jun',
      value: 6
    });
    this.MonthList.push({
      code: 'Jul',
      value: 7
    });
    this.MonthList.push({
      code: 'Aug',
      value: 8
    });
    this.MonthList.push({
      code: 'Sept',
      value: 9
    });
    this.MonthList.push({
      code: 'Oct',
      value: 10
    });
    this.MonthList.push({
      code: 'Nov',
      value: 11
    });
    this.MonthList.push({
      code: 'Dec',
      value: 12
    });

    this.YearList = [];
    const currentYear = (new Date()).getFullYear();
    for (let i = currentYear - 100; i <= currentYear; i++) {
      this.YearList.push(i);
    }

    if (resp.person.dob) {
      const date = new Date(resp.person.dob);
      this.userYear = date.getFullYear();
      this.userMonth = date.getMonth() + 1;
      this.userDay = date.getDate();

    }
    return resp;
  }

  countrySelected(event) {
    this.userCountryCode = event.value;
  }


  userSkinConcernChanged(event, code) {
    if (event.checked) {
      this.skinConcernItemStaus[code] = true;
    } else {
      this.skinConcernItemStaus[code] = false;
    }
  }

  isSkinConcernItemChecked(item) {
    return this.skinConcernItemStaus[item.code] === true;
  }

  genderChanged(gender) {
    this.userGenderCode = gender.value;
  }


  expesChanged(event) {
    this.userExpCode = event.value;
  }

  birthdayChanged($event) {
    this.birthdayAlert = false;
  }


}

