import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Vaccine } from 'src/app/models/vaccine.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-vaccine-pinned-countries',
  templateUrl: './vaccine-pinned-countries.component.html',
  styleUrls: ['./vaccine-pinned-countries.component.scss']
})
export class VaccinePinnedCountriesComponent implements OnInit {
  pinnedData: Vaccine[] = [];
  pinnedCountries: string[] = [];

  constructor(private appService: AppService) {}

  async ngOnInit(): Promise<void> {
    this.pinnedCountries = this.appService.getPinnedVaccineCountries();
    this.appService.pinCountryVaccine$.subscribe((data: Vaccine) => {
      if(!this.pinnedCountries.includes(data.iso)) {
        console.log(data);
        this.appService.setPinnedVaccineCountries(data.iso);
        this.pinnedData.push(data);
        this.pinnedCountries.push(data.iso);
      }
    });
    this.getPinnedCountryVaccines();
  }
  
  async getPinnedCountryVaccines() {
    const response: ApiResponse<Vaccine[]> = await this.appService.getPinnedCountryVaccine();
    if(response.status) {
      this.pinnedData = response.data;
    }
  }

  unpin(code: string) {
    this.appService.removePinnedVaccineCountries(code);
    this.pinnedCountries.splice(this.pinnedCountries.indexOf(code), 1);
    this.getPinnedCountryVaccines();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pinnedData, event.previousIndex, event.currentIndex);
  }
}
