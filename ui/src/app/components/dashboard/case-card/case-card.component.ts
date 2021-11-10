import { Component, Input, OnInit } from '@angular/core';
import { Case } from 'src/app/models/case.interface';

@Component({
  selector: 'app-case-card',
  templateUrl: './case-card.component.html',
  styleUrls: ['./case-card.component.scss']
})
export class CaseCardComponent implements OnInit {
  title: string;
  @Input() data: Case;
  @Input() removeTotal = false;
  icon: string = 'assets/flags/4x3/globe.svg';
  constructor() { }

  ngOnInit(): void {
    this.title = this.data.country ? this.data.country : 'World';
    this.icon = this.data.country ? `assets/flags/4x3/${this.data.countryInfo.iso2.toLowerCase()}.svg` : 'assets/flags/4x3/globe.svg';
  }
}
