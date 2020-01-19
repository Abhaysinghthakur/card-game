import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDisplay'
})
export class TimeDisplayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value) {
      value = Math.floor(value);
      let minutes: any = Math.floor(value / 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      } else {
        minutes = `${minutes}`;
      }
      if ((value - minutes * 60) < 10) {
        value = `0${(value - minutes * 60)}`;
      } else {
        value = `${(value - minutes * 60)}`;
      }
      return minutes + ':' + value;
    } else {
      return '00:00';
    }
  }

}
