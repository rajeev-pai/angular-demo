import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { CrudPressEvents } from '../../../helpers/types';

@Component({
  selector: 'mm-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.scss']
})
export class CrudButtonsComponent {

  @Input('hideAddIcon') hideAdd!: boolean;
  @Input('hideEditIcon') hideEdit!: boolean;
  @Input('hideViewIcon') hideView!: boolean;
  @Input('hideDeleteIcon') hideDelete!: boolean;

  @Output('press') press = new EventEmitter<CrudPressEvents>();

  onEmit(eventType: CrudPressEvents) {
    this.press.emit(eventType);
  }
}