import {Component, ElementRef, OnInit, viewChild} from '@angular/core';
import {Chart} from 'chart.js/auto';
@Component({
  selector: 'investment-graph',
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {

  canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('investmentPieCanvas');

  ngOnInit() {
    const investmentPie = new Chart(this.canvas().nativeElement,{
      type:'pie',
      data:{
        labels:["Investované","Zisk"],
        datasets:[
          {
            label:"Investované",
            data:[25000,15000]
          },
        ]
      }
    })
  }
}
