import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup,
  Validators,
  ValidatorFn,
} from '@angular/forms';

import { TransactionFormService } from './transaction-form.service';
import { TransactionFormField } from '../../../../helpers/types';

@Component({
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit { 

  formModel: TransactionFormField[] = [];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private txnFormService: TransactionFormService,
  ) { }

  ngOnInit() {
    this.formModel = this.txnFormService.getTransactionFormModel();
    this.createForm();
  }

  getFieldError() {

  }

  private createForm() {
    const formControls: { [key: string]: any; } = {};

    for (const field of this.formModel) {
      const formControl = [];

      switch (field.elementType) {
        case 'dateTimePicker':

          break;

        case 'select':
          if (field.options && (field.options.length > 0)) {
            formControl.push(field.options[0].value)
          }
          break;

        default:
          formControl.push('');
          break;
      }

      const synchronousValidators: ValidatorFn[] = [];

      if (field.isRequired) {
        synchronousValidators.push(Validators.required);
      }

      formControl.push(synchronousValidators);
      formControls[field.fieldName] = formControl;
    }
    
    this.form = this.fb.group(formControls);
  }
}
