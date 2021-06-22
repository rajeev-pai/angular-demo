import { 
  Component, 
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'mm-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {

  @Input('iconName') icon!: string;

  @Output('press') press = new EventEmitter();

  onClickButton(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.press.emit();
  }
}
