import { NgClass } from '@angular/common';
import { Component, input, Input } from '@angular/core';

type TAppearance = 'FILL' | 'OUTLINE';
type TColor = 'PRIMARY' | 'SECONDARY' | 'DANGER' | 'SUCCESS';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() appearance: TAppearance = 'FILL';
  @Input() color: TColor = 'PRIMARY';
  @Input() fullWidth: boolean = false;
  @Input() disabled: boolean = false;

  getClassNames() {
    return `btn-${this.appearance.toLowerCase()} btn-${this.color.toLowerCase()} ${this.fullWidth ? 'btn-block' : ''}`;
  }

}
