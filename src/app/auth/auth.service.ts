import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
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
  USERNAME_AVAILABLITY,
} from '../helpers/apis';

const AUTH_KEY = 'auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User | null>(null);
  private logoutSubject = new Subject();
  // private user: User | null = null;

  // Expose the observable created by the subject.
  user$: Observable<User | null> = this.subject.asObservable();
  logout$ = this.logoutSubject.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
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

  checkUsernameAvailability(username: string) {
    const params = new HttpParams().appendAll({
      username
    });

    return this.http
      .get<{ available: boolean; }>(USERNAME_AVAILABLITY, { params });
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

  logout() {
    this.cookieService.delete(AUTH_KEY);
    this.router.navigateByUrl('/login');
    this.subject.next(null);
  }

  // getUser() {
  //   return this.user;
  // }
}