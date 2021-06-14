import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CrudButtonsComponent } from './UI/crud-buttons/crud-buttons.component';
import { IconButtonComponent } from './UI/icon-button/icon-button.component';

@NgModule({
  declarations: [
    CrudButtonsComponent,
    IconButtonComponent,
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    CrudButtonsComponent,
    IconButtonComponent,
  ],
})
export class SharedModule { }