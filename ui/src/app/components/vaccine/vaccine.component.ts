import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Vaccine } from 'src/app/models/vaccine.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.scss']
})
export class VaccineComponent implements OnInit {
  worldVaccines: Vaccine;
  userCountryVaccines: Vaccine;
  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    await this.getWorldVaccines();
    await this.getUserCountryVaccines();
  }

  async getWorldVaccines() {
    const resposne: ApiResponse<Vaccine> = await this.appService.getWorldVaccine();
    if(resposne.status) {
      this.worldVaccines = resposne.data;
    }
  }
  async getUserCountryVaccines() {
    const resposne: ApiResponse<Vaccine> = await this.appService.getUserCountryVaccine();
    if(resposne.status) {
      this.userCountryVaccines = resposne.data;
    }
  }

}
