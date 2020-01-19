import { Component, OnInit, ɵConsole } from '@angular/core';
import { StateService } from '../services/state.service';
import { ToastrService } from 'ngx-toastr';

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
  public gameState = [];
  public inGame = true;
  public isChoosen = -1;
  public previousIndex = -1;
  public isSelected = false;
  public rand;
  public time = 0;
  public difficulty = 0;
  public gameOnGoing = false;
  public totalTimeCounter = 0;
  public totalTimeInterval: any;
  public gameTimeout: any;
  public showPopUp = false;
  public won = null;
  public showStat = false;

  // tslint:disable-next-line: variable-name
  constructor(public _state: StateService, public _toastr: ToastrService) { }

  ngOnInit() {
    this.noOfRows = Array(this._state.noOfRows).fill(0);
    this.initState();
  }

  initState() {
    this.rand = Math.round(Math.random() * 100);
    this.cardsId = Array(this._state.noOfRows * this._state.noOfRows).fill(-1);
    this.cardsState = Array(this._state.noOfRows * this._state.noOfRows).fill(0);
    this.cardsNotInitialized = Array(this._state.noOfRows * this._state.noOfRows).fill(0).map((x, i) => i);
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
    const randomNo = Math.round(Math.random() * (this.cardsNotInitialized.length - 1));
    this.cardsId[this.cardsNotInitialized[randomNo]] = i;
    this.gameState.push(i);
    this.cardsNotInitialized.splice(randomNo, 1);
  }

  cardChoosen(data) {
    if (this.gameOnGoing && this.cardsState[data.index] !== 1) {
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
          this.gameState.splice(this.gameState.indexOf(data.id), 1);
          if (this.gameState.length === 0) {
            this.wonTheGame();
          }
          this.cardsState[data.index] = 1;
          this.isSelected = false;
          this.previousIndex = -1;
          this.isChoosen = -1;
        }
      }
    } else if (!this.gameOnGoing) {
      this._toastr.info('Click on "Start Game" button to start the game');
    }
  }

  changeDifficulty(i) {
    this.difficulty = i;
    this._toastr.info('You need to complete this level in ' + this._state.allowedTime[this.difficulty] + ' seconds to win');
  }

  startGame() {
    if (!this.gameOnGoing) {
      this.time = this._state.allowedTime[this.difficulty];
      this.totalTimeInterval = setInterval(() => {
        this.totalTimeCounter++;
        if (this.time > 0) {
          this.time--;
        }
      }, 1000);
      this.gameTimeout = setTimeout(() => {
        this.lostTheGame();
      }, this._state.allowedTime[this.difficulty] * 1000);

      this._toastr.success('You have ' + this._state.allowedTime[this.difficulty] + ' seconds to complete this level',
        'Game has started');
    }
    this.gameOnGoing = true;
  }

  resetGame() {
    this.won = null;
    this.showPopUp = false;
    this.time = 0;
    this.totalTimeCounter = 0;
    this.gameState = [];
    this.initState();
  }

  wonTheGame() {
    this.won = true;
    this.gameOnGoing = false;
    clearInterval(this.totalTimeInterval);
    clearTimeout(this.gameTimeout);
    this.showPopUp = true;
    this._state.timesPlayed[this.difficulty]++;
    this._state.timesWon[this.difficulty]++;
    if (this._state.bestTime[this.difficulty] === -1 || this.totalTimeCounter < this._state.bestTime[this.difficulty]) {
      this._state.bestTime[this.difficulty] = this.totalTimeCounter;
    }
  }

  lostTheGame() {
    this.won = false;
    this.gameOnGoing = false;
    clearInterval(this.totalTimeInterval);
    this.showPopUp = true;
    this._state.timesPlayed[this.difficulty]++;
  }

  showStats() {
    this.showStat = true;
  }

  closeStats() {
    this.showStat = false;
  }
}
