import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
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
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      // backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];
  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    await this.getUserCountryCases();
    await this.getUserCountryVaccine();
    this.getChartData();
  }

  getChartData() {
    this.appService.getUserCountryTimeSeries(this.appService.userLocation.region_code).then(response => {
      if(response.status) {
        const keys = Object.keys(response.data.dates);
        this.lineChartLabels = keys;
        const cases = [];
        const death = [];
        const recovered = [];
        const tested = [];
        const vaccine1 = [];
        const vaccine2 = [];
        const seriesData = response.data?.dates;
        console.log(seriesData);
        keys.forEach(data => {
          if(seriesData[data]) {
            const dateData = seriesData[data].total;
            cases.push(dateData?.confirmed ?? 0);
            death.push(dateData?.deceased ?? 0);
            recovered.push(dateData?.recovered ?? 0);
            tested.push(dateData?.tested ?? 0);
            vaccine1.push(dateData?.vaccinated1 ?? 0);
            vaccine2.push(dateData?.vaccinated2 ?? 0);
          }
          // return { data: [65, 59, 80, 81, 56, 55, 40], label: data }
        });
        this.lineChartData = [
          {
            label: 'Confirmed',
            data: cases,
          },
          {
            label: 'Death',
            data: death,
          },
          {
            label: 'Recovered',
            data: recovered,
          },
          {
            label: 'Tested',
            data: tested,
          }
        ]
      }
    });

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
