import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: []
})
export class DonutComponent implements OnChanges {

  @Input() title: string = 'Sin titulo';
  @Input() data_donut: any[] = [ 100, 100, 100 ];
  @Input('label_donut') doughnutChartLabels: string[] = [ 'Ventas', 'Ventas', 'Ventas' ];
  colors: string[] = ['#6857E6', '#009FEE', '#F02059'];

  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: this.data_donut, 
        backgroundColor: this.colors
      }
    ]
  }

  ngOnChanges() {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { 
          data: this.data_donut, 
          backgroundColor: this.colors
        }
      ]
    };
  }

}
