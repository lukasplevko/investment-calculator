import { Component } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {InvestmentCalculatorComponent} from './components/investment-calculator/investment-calculator.component';

@Component({
  selector: 'app-root',
  imports: [ MatFormFieldModule, MatInputModule, InvestmentCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'investment-calculator';
}
