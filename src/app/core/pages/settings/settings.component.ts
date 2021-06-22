import { 
  Component, 
  ViewChild, 
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../auth/auth.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('form') form!: NgForm;

  private subscription!: Subscription;

  constructor(
    private authService: AuthService,
  ) { }

  ngAfterViewInit() {
    // const user = this.authService.getUser();

    this.subscription = this.authService.user$
      .subscribe(user => {
        if (user) {
          setTimeout(() => {
            this.form.setValue({
              username: user.username
            });
          });
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.authService
      .updateUsername(this.form.value)
      .subscribe();
  }
}
