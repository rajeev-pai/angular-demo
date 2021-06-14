import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mm-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.scss']
})
export class CrudButtonsComponent {

  @Output('view') view = new EventEmitter();

  onView() {
    this.view.emit();
  }
}