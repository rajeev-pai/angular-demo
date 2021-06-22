import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

import {
  LoginFormData,
  SignUpFormData,
  LoginResponse,
  AccountDetailsResponse,
} from '../helpers/types';

import { User } from '../helpers/models';

import {
  LOGIN,
  SIGNUP,
  CHECK_AUTH,
  GET_ACCOUNT_DETAILS,
  UPDATE_USERNAME,
} from '../helpers/apis';

const AUTH_KEY = 'auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User | null>(null);
  // private user: User | null = null;

  // Expose the observable created by the subject.
  user$: Observable<User | null> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  login(data: LoginFormData) {
    return (this.http
      .post(LOGIN, data) as Observable<LoginResponse>)
      .pipe(
        tap(res => {
          // this.user = new User(res.id, res.email, res.username);
          this.subject.next(new User(res.id, res.email, res.username));
          const expiryTime = Date.now() + (24 * 60 * 60 * 1000);

          this.cookieService.set(AUTH_KEY, res.token, {
            path: '/',
            expires: new Date(expiryTime),
          });
        }),
      );
  }

  signUp(data: SignUpFormData) {
    return this.http.post(SIGNUP, data);
  }

  getAuthToken() {
    return this.cookieService.get(AUTH_KEY);
  }

  checkAuthValidity() {
    return this.http.get(CHECK_AUTH) as Observable<{ auth: boolean; }>;
  }

  getAccountDetails() {
    return this.http
      .get<AccountDetailsResponse>(GET_ACCOUNT_DETAILS)
      .pipe(
        tap(({ id, email, username }) => {
          // this.user = new User(id, email, username);
          this.subject.next(new User(id, email, username));
        }),
      );
  }

  updateUsername(data: { username: string; }) {
    return this.http
      .patch<AccountDetailsResponse>(UPDATE_USERNAME, data)
      .pipe(
        tap(({ id, email, username }) => {
          this.subject.next(new User(id, email, username));
        }),
      );
  }

  // getUser() {
  //   return this.user;
  // }
}