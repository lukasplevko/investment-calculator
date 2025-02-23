import {Component, effect, ElementRef, input, OnInit, signal, viewChild} from '@angular/core';
import {Chart, ChartConfiguration} from 'chart.js/auto';
import {InvestmentResults} from '../../../interfaces/investment-results';
import {CurrencyPipe} from '@angular/common';
@Component({
  selector: 'investment-graph',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {

  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('investmentPieCanvas');
  investmentResults = input<InvestmentResults>()

  chart:Chart | null = null;

  constructor() {
    effect(()=>{
      this.chart?.data.datasets.forEach((dataset)=>{
        dataset.data[0] = this.investmentResults()?.invested ?? 0;
        dataset.data[1] = this.investmentResults()?.profit ?? 0;
      })
      this.chart?.update();

    })
  }
  ngOnInit() {
    const config:ChartConfiguration = {
      type: 'pie',
      data:{
        labels:["Investované","Zisk"],
        datasets:[
          {
            label:"Investované",
            data:[this.investmentResults()?.invested ?? 0,this.investmentResults()?.profit ?? 0]
          },
        ]
      }
    }
   this.chart = new Chart(this.canvas().nativeElement,config)
  }
}
