import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './auto-logout-modal.component.html',
  styleUrls: ['./auto-logout-modal.component.scss']
})
export class AutoLogoutModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AutoLogoutModalComponent>,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

  onCancel() {
    this.authService.logout();
    this.dialogRef.close();
  }

  onConfirm() {
    this.authService
      .refreshAuthKey()
      .subscribe(_ => {
        this.dialogRef.close();
      });
  }
}
