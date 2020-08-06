import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { roles } from '../constants/user';
import { CookieService } from 'ngx-cookie-service';

import * as _ from 'lodash';

@Injectable()
export class AuthService {

  currentUserStream: ReplaySubject<any> = new ReplaySubject(1);
  currentUser: any = null;

  constructor(private cookieService: CookieService) { }

  getToken() {
    return this.cookieService.get('token');
  }

  setToken(token) {
    this.cookieService.set('token', token);
  }

  signOut() {
    this.cookieService.delete('token');
    setTimeout(() => location.reload(), 500);
  }

  changeUser(user) {
    console.log('changeUser(user)', user);
    this.currentUser = user;
    this.currentUserStream.next(user);
  }

  getCurrentUserStream() {
    return this.currentUserStream;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isSigned() {
    return this.currentUser && this.currentUser.role === roles.ADMIN;
  }

  isActivated() {
    return this.currentUser && this.currentUser.role === roles.ADMIN && this.currentUser.isActivated;
  }

  setDriverLicence(driverLicense) {
    this.currentUser.driverLicense = _.merge(this.currentUser.driverLicense, driverLicense);
  }

}
