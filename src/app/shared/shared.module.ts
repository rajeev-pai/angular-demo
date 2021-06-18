import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { CrudButtonsComponent } from './UI/crud-buttons/crud-buttons.component';
import { IconButtonComponent } from './UI/icon-button/icon-button.component';
import { DeleteConfirmationModalComponent } from './UI/delete-confirmation-modal/delete-confirmation-modal.component';

@NgModule({
  declarations: [
    CrudButtonsComponent,
    IconButtonComponent,
    DeleteConfirmationModalComponent,
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
  ],
  exports: [
    CrudButtonsComponent,
    IconButtonComponent,
    DeleteConfirmationModalComponent,
  ],
})
export class SharedModule { }