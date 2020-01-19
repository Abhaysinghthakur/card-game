import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public noOfRows = 4;
  public allowedTime = [80, 60, 40];
  public timesPlayed = [0, 0, 0];
  public bestTime = [-1, -1, -1];

  constructor() { }
}
