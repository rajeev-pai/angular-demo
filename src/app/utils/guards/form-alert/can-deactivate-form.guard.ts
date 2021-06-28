import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { FormCanDeactivate } from './form-can-deactivate';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateForm implements CanDeactivate<FormCanDeactivate> {

  canDeactivate(component: FormCanDeactivate) {
    if (!component.canDeactivate()) {
      return confirm('You have unsaved changes! Are you sure you want to change page?');
    }

    return true;
  }
}