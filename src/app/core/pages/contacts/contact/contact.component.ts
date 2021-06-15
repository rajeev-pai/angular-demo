import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { CrudPressEvents, ContactData } from '../../../../helpers/types';

@Component({
  selector: 'mm-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  @Input('contactToDisplay') contact!: ContactData;

  @Output('favorite') favorite = new EventEmitter<boolean>();

  constructor(
    private router: Router,
  ) { }

  onCaptureEvent(e: CrudPressEvents) {
    switch (e) {
      case 'add':

        break;

      case 'view':
        this.onViewContact();
        break;

      case 'edit':
        this.onEditContact();
        break;
    }
  }

  onViewContact() {
    this.router.navigate(['/app/contact', this.contact.id]);
  }

  onEditContact() {
    this.router.navigate(['/app/edit-contact', this.contact.id]);
  }
}
