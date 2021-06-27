import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { 
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatDateFormats,
  NGX_MAT_DATE_FORMATS
} from '@angular-material-components/datetime-picker';

// import { ContactsComponent } from './pages/contacts/contacts.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { ContactComponent } from './pages/contacts/contact/contact.component';
// import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
// import { TransactionComponent } from './pages/transactions/transaction/transaction.component';
import { TransactionFormComponent } from './pages/transactions/transaction-form/transaction-form.component';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ContactViewComponent } from './pages/contacts/contact-view/contact-view.component';
import { SettingsComponent } from './pages/settings/settings.component';


// If using Moment
// const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
//   parse: {
//     dateInput: "l, LTS"
//   },
//   display: {
//     dateInput: "l, LTS",
//     monthYearLabel: "MMM YYYY",
//     dateA11yLabel: "LL",
//     monthYearA11yLabel: "MMMM YYYY"
//   }
// };

@NgModule({
  declarations: [
    // NavbarComponent,
    // ContactsComponent,
    // ContactComponent,
    // ContactFormComponent,
    TransactionsComponent,
    // TransactionComponent,
    TransactionFormComponent,
    ContactViewComponent,
    SettingsComponent,
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    CoreRoutingModule,
    CommonModule,
    SharedModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule,
    NgxMatNativeDateModule,
  ],
  providers: [
    // { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})
export class CoreModule { }