import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { ContactData } from '../contacts.service';

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

  onViewContact(id: number) {
    this.router.navigate(['/app/contact', id]);
  }
}
