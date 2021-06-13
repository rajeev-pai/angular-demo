import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {

  @Input('iconName') icon!: string;
}
