import { Component } from '@angular/core';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styleUrls: []
})
export class Graph1Component {

  labels: string[] = [ 'Ventas 1', 'Ventas 2', 'Ventas 3' ];
  data: any[] = [ 350, 450, 100 ];

}
