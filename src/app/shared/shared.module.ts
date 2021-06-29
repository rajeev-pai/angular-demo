import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CrudButtonsComponent } from './UI/crud-buttons/crud-buttons.component';
import { IconButtonComponent } from './UI/icon-button/icon-button.component';
import { DeleteConfirmationModalComponent } from './UI/delete-confirmation-modal/delete-confirmation-modal.component';
import { AvatarPipe } from './pipes/avatar.pipe';
import { PageHeaderComponent } from './UI/page-header/page-header.component';
import { SpinnerComponent } from './UI/spinner/spinner.component';

@NgModule({
  declarations: [
    CrudButtonsComponent,
    IconButtonComponent,
    DeleteConfirmationModalComponent,
    AvatarPipe,
    PageHeaderComponent,
    SpinnerComponent,
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    CrudButtonsComponent,
    IconButtonComponent,
    DeleteConfirmationModalComponent,
    AvatarPipe,
    PageHeaderComponent,
    SpinnerComponent,
  ],
})
export class SharedModule { }