import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ContactFormService } from './contact-form.service';
import { ContactsService } from '../contacts.service';
import { UpdateContactData } from '../../../../helpers/types';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  title = 'New Contact';
  buttonTitle = 'Create';

  @ViewChild('contactForm') form!: NgForm;

  private contactId?: number;

  constructor(
    private contactFormService: ContactFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(param => {
        // this.contactId = parseInt(param['id'], 10);

        if (param['id']) {
          this.contactId = +param['id'];
          this.title = 'Edit Contact';
          this.buttonTitle = 'Update'
    
          this.contactsService
            .fetchContactById(this.contactId)
            .subscribe(res => {
              this.form.setValue({
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
              });
            });
        }
      });

    // console.log(this.activatedRoute.snapshot.params['id']);
  }

  onSubmitForm() {
    if (!this.contactId) {
      this.contactFormService
        .createContact(this.form.value)
        .subscribe(res => {
          this.router.navigateByUrl('/app/contacts');
        });
    } else {
      const updateData: UpdateContactData = {
        ...this.form.value,
        id: this.contactId,
      };

      this.contactFormService
        .updateContact(updateData)
        .subscribe(res => {
          this.router.navigateByUrl('/app/contacts');
        });
    }
  }
}
