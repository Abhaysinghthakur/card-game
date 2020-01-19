import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  @Output() closeStats: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line: variable-name
  constructor(public _state: StateService) { }

  ngOnInit() {
  }


  close() {
    this.closeStats.emit();
  }
}
