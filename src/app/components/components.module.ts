import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncrementerComponent } from './incrementer/incrementer.component';
import { DonutComponent } from './donut/donut.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    IncrementerComponent,
    DonutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncrementerComponent,
    DonutComponent
  ]
})
export class ComponentsModule { }
