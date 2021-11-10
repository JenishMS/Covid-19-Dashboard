import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Case } from 'src/app/models/case.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  worldCases: Case;
  userCountryCases: Case;
  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    await this.getWorldCases();
    await this.getUserCountryCases();
  }

  async getWorldCases() {
    const resposne: ApiResponse<Case> = await this.appService.getWorldCases();
    if(resposne.status) {
      this.worldCases = resposne.data;
    }
  }
  async getUserCountryCases() {
    const resposne: ApiResponse<Case> = await this.appService.getUserCountryCases();
    if(resposne.status) {
      this.userCountryCases = resposne.data;
    }
  }

}
