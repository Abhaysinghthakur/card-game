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
  public isChoosen = -1;
  public previousIndex = -1;
  public isSelected = false;
  public rand = Math.round(Math.random() * 100);

  // tslint:disable-next-line: variable-name
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
      if (this.cardsId.length === i + 1) {
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
    if (this.isChoosen === -1) {
      this.cardsState[data.index] = 1;
      this.isChoosen = data.id;
      this.previousIndex = data.index;
    } else if (this.previousIndex !== data.index && !this.isSelected) {
      if (this.isChoosen !== data.id) {
        this.cardsState[data.index] = 1;
        this.isSelected = true;
        setTimeout(() => {
          this.cardsState[data.index] = 0;
          this.cardsState[this.previousIndex] = 0;
          this.previousIndex = -1;
          this.isChoosen = -1;
          this.isSelected = false;
        }, 1000);
      } else {
        this.cardsState[data.index] = 1;
        this.isSelected = false;
        this.previousIndex = -1;
        this.isChoosen = -1;
      }
    }
  }

}
