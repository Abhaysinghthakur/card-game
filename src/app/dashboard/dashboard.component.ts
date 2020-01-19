import { Component, OnInit, ɵConsole } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public noOfRows = [];
  public noOfCards;
  public cardsState = [];
  public cardsId = [];
  public cardsNotInitialized = [];
  public inGame = true;

  constructor(public _state: StateService) { }

  ngOnInit() {
    this.noOfRows = Array(this._state.noOfRows).fill(0);
    this.cardsId = Array(this._state.noOfRows * this._state.noOfRows).fill(-1);
    this.cardsState = Array(this._state.noOfRows * this._state.noOfRows).fill(0);
    this.cardsNotInitialized = Array(this._state.noOfRows * this._state.noOfRows).fill(0).map((x, i) => i);
    this.initState();
  }

  initState() {
    this.noOfCards = this._state.noOfRows * this._state.noOfRows;
    for (let i = 0; i < this.cardsId.length; i++) {
      if (this.cardsId[i] === -1) {
        this.findPair(i);
      }
      if (this.cardsId.length - 1 === i) {
        console.log(this.cardsId);
      }
    }
  }

  findPair(i) {
    this.cardsNotInitialized.splice(this.cardsNotInitialized.indexOf(i), 1);
    this.cardsId[i] = i;
    const randomNo = Math.round(Math.random() * this.cardsNotInitialized.length);
    this.cardsId[this.cardsNotInitialized[randomNo]] = i;
    this.cardsNotInitialized.splice(randomNo, 1);
  }

  cardChoosen(data) {
    console.log(data);
  }

}
