import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

interface NavLink {
  name: string;
  path: string;
}

@Component({
  selector: 'mm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // username = this.authService.getUser()?.username;
  username = '';
  remainingSessionTime = '00:00';

  private userSubscription!: Subscription;
  private autoLogoutTimeSubscription!: Subscription;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$
      .subscribe(user => {
        if (user) {
          this.username = user.username;
        }
      });

    // Listen to auto logout time event.
    this.autoLogoutTimeSubscription = this.authService.sessionTime$
      .subscribe(time => {
        this.remainingSessionTime = time;
      });

    // Check for session time on load.
    this.authService.checkForSessionTime();

    this.authService
      .getAccountDetails()
      .subscribe();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.autoLogoutTimeSubscription.unsubscribe();
  }

  links: NavLink[] = [
    {
      name: 'Contacts',
      path: '/contacts'
    },
    {
      name: 'Transactions',
      path: '/transactions'
    }
  ];

  // get username() {
  //   return this.authService.getUser()?.username;
  // }

  onLogout() {
    this.authService.logout();
  }
}