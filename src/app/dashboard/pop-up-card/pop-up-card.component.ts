import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up-card',
  templateUrl: './pop-up-card.component.html',
  styleUrls: ['./pop-up-card.component.css']
})
export class PopUpCardComponent implements OnInit {

  @Input() totalTime;
  @Output() resetState: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  okay() {
    this.resetState.emit();
  }

}
