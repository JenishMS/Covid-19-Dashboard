import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vaccine } from 'src/app/models/vaccine.model';

@Component({
  selector: 'app-vaccine-card',
  templateUrl: './vaccine-card.component.html',
  styleUrls: ['./vaccine-card.component.scss']
})
export class VaccineCardComponent implements OnInit {
  title: string;
  @Input() data: Vaccine;
  @Input() type = 'default';
  icon: string = 'assets/flags/4x3/globe.svg';
  @Output() unpin = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    this.title = this.data.country ? this.data.country : 'World';
    this.icon = this.data.country ? `assets/flags/4x3/${this.data.iso.substr(0,2).toLowerCase()}.svg` : 'assets/flags/4x3/globe.svg';
  }

  unpinCountry(data: Vaccine) {
    this.unpin.emit(data.iso);
  }
}
