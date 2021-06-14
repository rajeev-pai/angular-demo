import { Component, Output, EventEmitter } from '@angular/core';

import { CrudPressEvents } from './crud-buttons.type';

@Component({
  selector: 'mm-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.scss']
})
export class CrudButtonsComponent {

  @Output('press') press = new EventEmitter<CrudPressEvents>();

  onEmit(eventType: CrudPressEvents) {
    this.press.emit(eventType);
  }
}