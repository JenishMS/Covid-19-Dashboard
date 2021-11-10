import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Case } from 'src/app/models/case.interface';

@Component({
  selector: 'app-country-case-card',
  templateUrl: './country-case-card.component.html',
  styleUrls: ['./country-case-card.component.scss']
})
export class CountryCaseCardComponent implements OnInit {
  @Input() data: Case;
  @Output() unpin = new EventEmitter();
  icon: string = 'assets/flags/4x3/globe.svg';
  constructor() { }

  ngOnInit(): void {
    this.icon = `assets/flags/4x3/${this.data.countryInfo.iso2.toLowerCase()}.svg`;
  }

  unpinCountry(data: Case) {
    this.unpin.emit(data.countryInfo.iso2);
  }

}
