import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { ContactData } from '../contacts.service';

@Component({
  selector: 'mm-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  @Input('contactToDisplay') contact!: ContactData;

  @Output('favorite') favorite = new EventEmitter<boolean>();

  onFavorite() {
    this.favorite.emit(true);
  }
}
