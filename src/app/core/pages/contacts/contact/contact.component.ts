import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CrudPressEvents, ContactData } from '../../../../helpers/types';
import { DeleteConfirmationModalComponent } from '../../../../shared/UI/delete-confirmation-modal/delete-confirmation-modal.component';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'mm-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  @Input('contactToDisplay') contact!: ContactData;

  @Output('refresh') refresh = new EventEmitter();

  private deleteModalRef!: MatDialogRef<DeleteConfirmationModalComponent>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private contactService: ContactsService,
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

      case 'delete':
        this.onConfirmDelete();
        break;
    }
  }

  onViewContact() {
    this.router.navigate(['/app/contact', this.contact.id]);
  }

  onEditContact() {
    this.router.navigate(['/app/edit-contact', this.contact.id]);
  }

  onConfirmDelete() {
    this.deleteModalRef = this.dialog
      .open(DeleteConfirmationModalComponent, {
        data: {
          title: 'Are you sure you want to delete this contact?',
          description: 'Deleting this contact will permanently remove it.',
          deleteFunc: this.deleteContact
        },
      });

    // this.deleteModalRef
    //   .afterClosed()
    //   .subscribe(result => {
        
    //   });
  }

  private deleteContact = () => {
    this.contactService
      .deleteContact(this.contact.id)
      .subscribe(res => {
        if (res.success) {
          this.deleteModalRef.close();
          this.refresh.emit();
        }
      });
  }
}
