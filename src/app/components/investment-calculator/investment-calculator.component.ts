import {Component, OnInit, signal} from '@angular/core';
import {FormComponent} from "./form/form.component";
import {HeaderComponent} from "./header/header.component";
import {GraphComponent} from './graph/graph.component';
import {InvestmentCalculationInputs} from '../../interfaces/investment-calculation-inputs';
import {InvestmentResults} from '../../interfaces/investment-results';
import {reduce} from 'rxjs';
import {EInvestmentScenarios} from '../../enums/investment-scenarios';
import {EInvestmentStrategies} from '../../enums/investment-strategies';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'investment-calculator',
  imports: [
    FormComponent,
    GraphComponent,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './investment-calculator.component.html',
  styleUrl: './investment-calculator.component.scss'
})
export class InvestmentCalculatorComponent{

  investmentResults = signal<InvestmentResults>({
    invested:0,
    profit:0
  })
  manageInvestmentCalculations(data:InvestmentCalculationInputs){
    const investedDuration = data.investmentDuration*12;
    const investedAmount = data.initialInvestment + data.monthlyInvestment*investedDuration;
    const interest = this.determineInterestRate(data.investmentScenario,data.investmentStrategy)
    const profit = Array.from(Array(data.investmentDuration).keys()).reduce((accumulator,currentValue)=>{
      const yearlyInvestment = currentValue + data.monthlyInvestment*12;
      return accumulator + (yearlyInvestment*interest)
    },data.initialInvestment)

   const results:InvestmentResults = {
      invested: investedAmount,
      profit,
    }
    this.investmentResults.update(()=>results)
  }

  private determineInterestRate(scenario:string, strategy:string, customIndex:number = 0){
    let scenarioIndex = 0;
    let strategyIndex = 0;

    if(scenario == EInvestmentScenarios.optimistic){scenarioIndex = 3}
    if(scenario == EInvestmentScenarios.neutral){scenarioIndex = 0}
    if(scenario == EInvestmentScenarios.pessimistic){scenarioIndex = -3}

    if(strategy == EInvestmentStrategies.conservative){strategyIndex = 3}
    if(strategy == EInvestmentStrategies.balanced){strategyIndex = 4}
    if(strategy == EInvestmentStrategies.growth){strategyIndex = 5}
    if(strategy == EInvestmentStrategies.dynamic){strategyIndex = 8}
    if(strategy == EInvestmentStrategies.custom){strategyIndex = customIndex}

    return (scenarioIndex + strategyIndex)/100;
  }

}
