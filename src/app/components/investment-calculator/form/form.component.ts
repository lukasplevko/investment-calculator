import {Component} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatDivider} from '@angular/material/divider';
import {MatFormField, MatLabel, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EInvestmentStrategies} from '../../../enums/investment-strategies';
import {EInvestmentScenarios} from '../../../enums/investment-scenarios';

@Component({
  selector: 'investment-calculator-form',
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup,
    MatDivider,
    MatFormField,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSlider,
    MatSliderThumb,
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  DEFAULT_INVESTMENT_SETTINGS = {
    MINIMAL_MONTHLY_INVESTMENT:20,
    MAXIMAL_MONTHLY_INVESTMENT:1000,
    MINIMAL_INVESTMENT_DURATION:2,
    MAXIMAL_INVESTMENT_DURATION:30,
  }

  private defaultValidations(
    min=this.DEFAULT_INVESTMENT_SETTINGS.MINIMAL_MONTHLY_INVESTMENT,
    max=this.DEFAULT_INVESTMENT_SETTINGS.MAXIMAL_MONTHLY_INVESTMENT){
    return [
      Validators.required,
      Validators.min(min),
      Validators.max(max),
    ]
  }

  investmentCalculatorForm = new FormGroup({
    monthlyInvestment: new FormControl(20,[...this.defaultValidations()]),
    initialInvestment: new FormControl(20,[...this.defaultValidations()]),
    investmentDuration:new FormControl(2,[
      ...this.defaultValidations(
        this.DEFAULT_INVESTMENT_SETTINGS.MINIMAL_INVESTMENT_DURATION,
        this.DEFAULT_INVESTMENT_SETTINGS.MAXIMAL_INVESTMENT_DURATION,
      )]
    ),
    investmentStrategy: new FormControl<EInvestmentStrategies>(
      EInvestmentStrategies.conservative,[
      Validators.required,
    ]),
    investmentScenarios: new FormControl<EInvestmentScenarios>(
      EInvestmentScenarios.neutral,
      [
        Validators.required
      ]),
  })
  protected readonly EInvestmentStrategies = EInvestmentStrategies;
  protected readonly EInvestmentScenarios = EInvestmentScenarios;


  get monthlyInvestment(){return this.investmentCalculatorForm.get('monthlyInvestment')}
  get initialInvestment(){return this.investmentCalculatorForm.get('initialInvestment')}
  get investmentDuration(){return this.investmentCalculatorForm.get('investmentDuration')}
  get investmentStrategy(){return this.investmentCalculatorForm.get('investmentStrategy')}
  get investmentScenario(){return this.investmentCalculatorForm.get('investmentScenarios')}



}
