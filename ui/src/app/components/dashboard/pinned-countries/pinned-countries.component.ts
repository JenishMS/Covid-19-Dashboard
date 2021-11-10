import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Case } from 'src/app/models/case.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-pinned-countries',
  templateUrl: './pinned-countries.component.html',
  styleUrls: ['./pinned-countries.component.scss']
})
export class PinnedCountriesComponent implements OnInit {
  pinnedData: Case[] = [];
  pinnedCountries: string[] = [];

  constructor(private appService: AppService) {}

  async ngOnInit(): Promise<void> {
    this.pinnedCountries = this.appService.getPinnedCaseCountries();
    this.appService.pinCountryCase$.subscribe((data: Case) => {
      if(!this.pinnedCountries.includes(data.countryInfo.iso2)) {
        this.appService.setPinnedCaseCountries(data.countryInfo.iso2);
        this.pinnedData.push(data);
        this.pinnedCountries.push(data.countryInfo.iso2);
      }
    });
    this.getPinnedCountryCases();
    console.log('sgsfg');
  }
  
  async getPinnedCountryCases() {
    const response: ApiResponse<Case[]> = await this.appService.getPinnedCountryCases();
    if(response.status) {
      this.pinnedData = response.data;
    }
  }

  unpin(code: string) {
    this.appService.removePinnedCaseCountries(code);
    this.pinnedCountries.splice(this.pinnedCountries.indexOf(code), 1);
    this.getPinnedCountryCases();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pinnedData, event.previousIndex, event.currentIndex);
  }

}
