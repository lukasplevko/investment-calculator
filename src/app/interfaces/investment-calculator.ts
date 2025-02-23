import {AbstractControl, FormControl} from '@angular/forms';
import {EInvestmentStrategies} from '../enums/investment-strategies';
import {EInvestmentScenarios} from '../enums/investment-scenarios';

export interface InvestmentCalculator {
  monthlyInvestment: number[]|AbstractControl[],
  initialInvestment: FormControl<number>,
  investmentDuration: FormControl<number>,
  investmentStrategy: FormControl<EInvestmentStrategies>,
  investmentScenario: FormControl<EInvestmentScenarios>,

}
