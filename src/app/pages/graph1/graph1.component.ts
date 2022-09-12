import { Component } from '@angular/core';
import { Color } from 'chart.js';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component {

  public labels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public color: Color [] = ['#6857E6', '#009FEE', '#F02059'];
  public data: number [] = [ 350, 450, 1100 ];

  public labels2: string[] = [ 'First', 'Second ', 'ThirdOne' ];
  public color2: Color [] = ['#6857E6', '#009FEE', '#F02059'];
  public data2: number [] = [ 800, 100, 1600 ] 

  public labels3: string[] = [ 'Food', 'Soda ', 'Hamburguer' ];
  public color3: Color [] = ['#6857E6', '#009FEE', '#F02059'];
  public data3: number [] = [ 1000, 800, 200 ] 
}
