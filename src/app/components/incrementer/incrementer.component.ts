import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: []
})
export class IncrementerComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input() progress: number = 50;
  @Input() btnClass: string = 'btn-primary';
  @Output() progressExit: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.progressExit.emit(100);
      return this.progress = 100;
    }
    if (this.progress <= 0 && value < 0) {
      this.progressExit.emit(0);
      return this.progress = 0;
    }

    this.progressExit.emit(this.progress + value);
    return this.progress = this.progress + value;
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progress = 100;
    } else if (newValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = newValue;
    }
    this.progressExit.emit(this.progress);
  }

}
