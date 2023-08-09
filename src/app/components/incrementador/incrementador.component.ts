import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progress: number = 80;
  @Input() btnClass: string = 'btn-primary';

  @Output() outputValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`
  }

  changeValue(value: number){
    if( this.progress + value > 100 || this.progress +value < 0){
      return
    }
    this.progress = this.progress + value
    this.outputValue.emit(this.progress)
  }

  onChange( value: number){
    if( value > 100){
      this.outputValue.emit(100)
    }else if( value < 0){
      this.outputValue.emit(0)
    }else{
      this.outputValue.emit(value)
    }
  }

  onKeyUp( value: any ){
    if( value.target.value > 100){
      this.progress = 100
    }else if( value < 0){
      this.progress = 0
    }
  }

}
