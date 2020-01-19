import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() id;
  @Input() index;
  @Input() rand;
  @Input() cardClass;
  @Output() cardChooosen: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  cardClicked() {
    this.cardChooosen.emit({ id: this.id, index: this.index });
  }
}
