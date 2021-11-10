import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Case } from 'src/app/models/case.interface';
import { Vaccine } from 'src/app/models/vaccine.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-user-country',
  templateUrl: './user-country.component.html',
  styleUrls: ['./user-country.component.scss']
})
export class UserCountryComponent implements OnInit {
  caseData: Case;
  vaccineData: Vaccine;
  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    await this.getUserCountryCases();
    await this.getUserCountryVaccine();
  }

  async getUserCountryCases() {
    const resposne: ApiResponse<Case> = await this.appService.getUserCountryCases();
    if(resposne.status) {
      this.caseData = resposne.data;
    }
  }
  async getUserCountryVaccine() {
    const resposne: ApiResponse<Vaccine> = await this.appService.getUserCountryVaccine();
    if(resposne.status) {
      this.vaccineData = resposne.data;
    }
  }
}
