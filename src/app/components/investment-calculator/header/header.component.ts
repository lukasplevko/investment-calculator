import { Component } from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'investment-calculator-header',
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup,
    MatDivider
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
