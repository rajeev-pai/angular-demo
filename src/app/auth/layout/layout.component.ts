import { Component } from '@angular/core';

@Component({
  selector: 'mm-auth-layout',
  template: `
    <div class="container">
      <mat-card>
        <ng-content></ng-content>
      </mat-card>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class AuthLayoutComponent {

}