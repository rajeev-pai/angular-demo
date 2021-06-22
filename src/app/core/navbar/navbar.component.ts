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

  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.subscription = this.authService.user$
      .subscribe(user => {
        if (user) {
          this.username = user.username;
        }
      });

    this.authService
      .getAccountDetails()
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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