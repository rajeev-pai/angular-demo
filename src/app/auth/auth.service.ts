import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

import {
  LoginFormData,
  SignUpFormData,
  LoginResponse,
  AccountDetailsResponse,
} from '../helpers/types';

import { User } from '../helpers/models';
import { AutoLogoutModalComponent } from './auto-logout-modal/auto-logout-modal.component';

import {
  LOGIN,
  SIGNUP,
  CHECK_AUTH,
  GET_ACCOUNT_DETAILS,
  UPDATE_USERNAME,
  USERNAME_AVAILABLITY,
} from '../helpers/apis';

const AUTH_KEY = 'ak';
const REFRESH_AT = 'ae';
const REFRESH_TOKEN = 'rt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<User | null>(null);
  private logoutSubject = new Subject();
  // private user: User | null = null;

  private refreshAt = 0;
  private interval: ReturnType<typeof setInterval> | null = null;
  private sessionTimeSubject = new BehaviorSubject<string>('00:00');
  private authToken: string | null = null;
  private refreshToken: string | null = null;

  // Expose the observable created by the subject.
  user$: Observable<User | null> = this.subject.asObservable();
  logout$ = this.logoutSubject.asObservable();
  sessionTime$ = this.sessionTimeSubject.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private matDialog: MatDialog,
  ) { }

  login(data: LoginFormData) {
    return (this.http
      .post(LOGIN, data) as Observable<LoginResponse>)
      .pipe(
        tap(res => {
          // this.user = new User(res.id, res.email, res.username);
          this.subject.next(new User(res.id, res.email, res.username));
          // const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
          
          // 60 seconds.
          // Obtained from the backend.
          const refreshDuration = 100 * 1000;
          this.refreshAt = Date.now() + refreshDuration;
          this.refreshToken = this.getRefreshToken();
          this.setAutoLogoutTime(refreshDuration);
          this.setAuthKey(res.token);

          // this.cookieService.set(AUTH_KEY, res.token, {
          //   path: '/',
          //   expires: new Date(expiryTime),
          // });
        }),
      );
  }

  signUp(data: SignUpFormData) {
    return this.http
      .post(SIGNUP, data)
      .pipe(
        map(res => {
          return {
            success: true,
            data: res,
            error: null
          };
        }),
        catchError(err => {
          return of({
            success: false,
            data: null,
            error: err.error.errors
          });
        }),
      );
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
    this.cookieService.delete(REFRESH_AT);
    this.cookieService.delete(REFRESH_TOKEN);
    this.authToken = null;
    this.router.navigateByUrl('/login');
    this.subject.next(null);
    this.stopAutoLogoutTimer();
  }

  // getUser() {
  //   return this.user;
  // }

  /**
   * API to refresh the auth key.
   * @returns 
   */
  refreshAuthKey() {
    // API TO REFRESH THE AUTH KEY.
    return of(null)
      .pipe(
        tap(res => {
          // New expiry duration obtained from backend.
          const newRefreshDuration = 100 * 1000;
          this.refreshToken = this.getRefreshToken();
          this.setAutoLogoutTime(newRefreshDuration);
          this.setAuthKey(this.authToken!);
        }),
      );
  }

  /**
   * Method to check if there is any session time left
   * on page reload.
   */
  checkForSessionTime() {
    if (this.refreshAt === 0) {
      const refreshTime = this.cookieService.get(REFRESH_AT);
      this.refreshToken = this.cookieService.get(REFRESH_TOKEN);
      
      if (refreshTime && this.refreshToken) {
        this.authToken = this.getAuthToken();
        this.setAutoLogoutTime(+refreshTime - Date.now());
      }
    }
  }

  /**
   * Private function to set auto logout time.
   * @param {number} durationInMs 
   * @returns 
   */
  private setAutoLogoutTime(durationInMs: number) {
    if (durationInMs <= 0) {
      // If invalid duration, do nothing.
      return;
    }

    const currentTime = Date.now();
    // Add the duration to current time (in milliseconds).
    this.refreshAt = currentTime + durationInMs;
    this.startAutoLogoutTimer();
  }

  /**
   * Private function to start the auto logout timer.
   * @returns 
   */
  private startAutoLogoutTimer() {
    // Make sure no other auto logout timer is active.
    this.stopAutoLogoutTimer();

    // Calculate the time left (in milliseconds).
    const timeLeftInMilliseconds = this.refreshAt - Date.now();

    if (timeLeftInMilliseconds < 0) {
      return;
    }

    // Convert milliseconds to seconds.
    let timeLeftInSeconds = (timeLeftInMilliseconds) / 1000;

    // Broadcast the remaining time after formatting.
    this.sessionTimeSubject.next(this.getFormattedTime(timeLeftInSeconds));

    // Start the countdown...
    this.interval = setInterval(() => {
      if (Date.now() > this.refreshAt) {
        // Show the modal when countdown finishes.
        this.showRefreshModal();
        return;
      }

      timeLeftInSeconds -= 1;

      // Broadcase the remaining time after formatting.
      this.sessionTimeSubject.next(this.getFormattedTime(timeLeftInSeconds));
    }, 1000);
  }

  /**
   * Private function to stop the auto logout timer.
   */
  private stopAutoLogoutTimer() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = null;

    // Broadcast the last countdown state.
    this.sessionTimeSubject.next('00:00');
  }

  /**
   * Private function to show the token refresh modal.
   */
  private showRefreshModal() {
    this.matDialog.open(AutoLogoutModalComponent);
    this.stopAutoLogoutTimer();
  }

  /**
   * Private function to get the formatted time (MM:SS).
   * @param {number} totalDurationInSeconds 
   * @returns {string}
   */
  private getFormattedTime(totalDurationInSeconds: number): string {
    if (totalDurationInSeconds <= 0) {
      return '00:00';
    }

    const minutes = Math.floor(totalDurationInSeconds / 60);
    const seconds = Math.floor(totalDurationInSeconds % 60);

    const minuteToDisplay = (minutes < 10)
      ? ('0' + minutes) // Prepend '0' if the minute is between 0 and 9
      : minutes.toString();

    const secondToDisplay = (seconds < 10)
      ? ('0' + seconds) // Prepend '0' if the second is between 0 and 9
      : seconds.toString();

    return `${minuteToDisplay}:${secondToDisplay}`;
  }

  /**
   * Private function to set the auth key in the storage.
   * @param {string} key 
   */
  private setAuthKey(key: string) {
    this.authToken = key;
    const expiryTime = new Date(this.refreshAt);

    // Set the auth key in storage.
    this.cookieService.set(AUTH_KEY, key, {
      path: '/',
      expires: expiryTime,
    });

    // Set the remaining time in the storage.
    this.cookieService.set(REFRESH_AT, this.refreshAt.toString(), {
      path: '/',
      expires: expiryTime,
    });

    // Set the refresh token in the storage.
    this.cookieService.set(REFRESH_TOKEN, this.refreshToken!, {
      path: '/',
      expires: expiryTime
    });
  }

  /**
   * Private function to get a random refresh token.
   * @returns {string}
   */
  private getRefreshToken(): string {
    return Math.floor(Math.random() * 6) + 'qwetastdasgqtiruqw';
  }
}