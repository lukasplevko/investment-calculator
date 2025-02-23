import { Component } from '@angular/core';
import {FormComponent} from "./form/form.component";
import {HeaderComponent} from "./header/header.component";
import {GraphComponent} from './graph/graph.component';

@Component({
  selector: 'investment-calculator',
  imports: [
    FormComponent,
    HeaderComponent,
    GraphComponent
  ],
  templateUrl: './investment-calculator.component.html',
  styleUrl: './investment-calculator.component.scss'
})
export class InvestmentCalculatorComponent {

}
