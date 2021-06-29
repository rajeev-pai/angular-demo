import { Component, ViewChild, OnInit } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NotifierService } from 'angular-notifier';

import { ContactFormService } from './contact-form.service';
import { ContactsService } from '../contacts.service';
import { UpdateContactData } from '../../../../helpers/types';
import { FormCanDeactivate } from '../../../../utils/guards/form-alert/form-can-deactivate';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent extends FormCanDeactivate implements OnInit {

  title = 'New Contact';
  buttonTitle = 'Create';

  @ViewChild('contactForm') form!: NgForm;

  private contactId?: number;

  constructor(
    private contactFormService: ContactFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private notifierService: NotifierService,
  ) {
    super();
  }

  get formRef() {
    return this.form;
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(param => {
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
  }

  onSubmitForm() {
    if (!this.contactId) {
      this.contactFormService
        .createContact(this.form.value)
        .subscribe(res => {
          this.notifierService.notify(
            'success',
            'Contact created successfully!'
          );

          this.form.reset();
          this.router.navigateByUrl('/contacts');
        });
    } else {
      const updateData: UpdateContactData = {
        ...this.form.value,
        id: this.contactId,
      };

      this.contactFormService
        .updateContact(updateData)
        .subscribe(res => {
          this.notifierService.notify(
            'success',
            'Contact updated successfully!'
          );

          this.form.reset();
          this.router.navigateByUrl('/contacts');
        });
    }
  }
}
