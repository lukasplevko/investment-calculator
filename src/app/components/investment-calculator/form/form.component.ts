import {Component, EventEmitter, OnInit, output} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatDivider} from '@angular/material/divider';
import {MatError, MatFormField, MatLabel, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {EInvestmentStrategies} from '../../../enums/investment-strategies';
import {EInvestmentScenarios} from '../../../enums/investment-scenarios';
import {debounceTime, map} from 'rxjs';
import {InvestmentCalculationInputs} from '../../../interfaces/investment-calculation-inputs';

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
    ReactiveFormsModule,
    MatError,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{

  private readonly DEFAULT_INVESTMENT_SETTINGS = {
    MINIMAL_MONTHLY_INVESTMENT:20,
    MAXIMAL_MONTHLY_INVESTMENT:1000,
    MINIMAL_INITIAL_INVESTMENT:20,
    MAXIMAL_INITIAL_INVESTMENT:100000,
    MINIMAL_INVESTMENT_DURATION:2,
    MAXIMAL_INVESTMENT_DURATION:30,
  }

  onFormValuesChanged = output<InvestmentCalculationInputs>();

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
    monthlyInvestment: new FormControl(20,[
      Validators.required,
      Validators.min(this.minimalMonthlyInvestment),
      Validators.max(this.maximalMonthlyInvestment)
    ]),
    initialInvestment: new FormControl(20,[
      Validators.required,
      Validators.min(this.minimalInitialInvestment),
      Validators.max(this.maximalInitialInvestment),
    ]),
    investmentDuration:new FormControl(2,[
      Validators.required,
      Validators.min(this.minimalInvestmentDuration),
      Validators.max(this.maximalInvestmentDuration),
      ]
    ),
    investmentStrategy: new FormControl<EInvestmentStrategies>(
      EInvestmentStrategies.conservative,[
        Validators.required,
      ]),
    investmentScenario: new FormControl<EInvestmentScenarios>(
      EInvestmentScenarios.neutral,
      [
        Validators.required
      ]),
  })

  ngOnInit() {

    this.onFormValuesChanged.emit(this.investmentCalculatorForm.getRawValue() as InvestmentCalculationInputs)

    this.investmentCalculatorForm.valueChanges.
    pipe(
      debounceTime(300),
      map((val)=>val as InvestmentCalculationInputs)
    )
      .subscribe((values)=>{
      this.onFormValuesChanged.emit(values);
    })

  }


  protected readonly EInvestmentStrategies = EInvestmentStrategies;
  protected readonly EInvestmentScenarios = EInvestmentScenarios;
  get minimalMonthlyInvestment(){return this.DEFAULT_INVESTMENT_SETTINGS.MINIMAL_MONTHLY_INVESTMENT}
  get maximalMonthlyInvestment(){return this.DEFAULT_INVESTMENT_SETTINGS.MAXIMAL_MONTHLY_INVESTMENT}
  get minimalInvestmentDuration(){return this.DEFAULT_INVESTMENT_SETTINGS.MINIMAL_INVESTMENT_DURATION}
  get maximalInvestmentDuration(){return this.DEFAULT_INVESTMENT_SETTINGS.MAXIMAL_INVESTMENT_DURATION}
  get minimalInitialInvestment(){return this.DEFAULT_INVESTMENT_SETTINGS.MINIMAL_INITIAL_INVESTMENT}
  get maximalInitialInvestment(){return this.DEFAULT_INVESTMENT_SETTINGS.MAXIMAL_INITIAL_INVESTMENT}
  get monthlyInvestment(){return this.investmentCalculatorForm.get('monthlyInvestment')}
  get initialInvestment(){return this.investmentCalculatorForm.get('initialInvestment')}
  get investmentDuration(){return this.investmentCalculatorForm.get('investmentDuration')}
  get investmentStrategy(){return this.investmentCalculatorForm.get('investmentStrategy')}
  get investmentScenario(){return this.investmentCalculatorForm.get('investmentScenarios')}




  message(errors:ValidationErrors){
    if(errors["min"]){
      return `Minimálna hodnota poľa je ${errors["min"].min}`
    }
    if(errors["max"]){
      return `Maximálna hodnota poľa je ${errors["max"].max}`
    }
    if(errors["required"]){
      return `Toto pole je povinné`
    }
    return
  }

}
