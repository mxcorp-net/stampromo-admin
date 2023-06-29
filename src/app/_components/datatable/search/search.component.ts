import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  datatableSearchInput: string;
  words: string[];

  @Output() onPressEnter = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      event.preventDefault();
      this.onPressEnter.emit(this.datatableSearchInput);
    }
  }
}
