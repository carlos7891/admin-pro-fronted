import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-donna',
  templateUrl: './donna.component.html',
  styles: [
  ]
})
export class DonnaComponent implements OnInit {

  @Input() title : string = 'Sin titulo';
  @Input('labels') doughnutChartLabels: string[] = [];
  @Input() color :  Color [] = [];
  @Input() data : number [] = [];
  
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: []
  };
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(){
    this.doughnutChartData.labels = this.doughnutChartLabels
    this.doughnutChartData.datasets = [
      { data: this.data,
        backgroundColor: this.color,
        hoverBackgroundColor: this.color,
        hoverBorderColor:this.color
      },
    ]
  }


  
}
