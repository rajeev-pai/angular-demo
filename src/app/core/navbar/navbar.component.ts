import { Component } from '@angular/core';

interface NavLink {
  name: string;
  path: string;
}

@Component({
  selector: 'mm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

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
}