import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Vaccine } from 'src/app/models/vaccine.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-all-country-vaccine',
  templateUrl: './all-country-vaccine.component.html',
  styleUrls: ['./all-country-vaccine.component.scss']
})
export class AllCountryVaccineComponent implements OnInit {
  VaccineList: Vaccine[] = [];
  displayedColumns: string[] = ['sno', 'country', 'total', 'vaccinated', 'fullyVaccinated', 'percentage', 'population', 'action'];
  dataSource = new MatTableDataSource<Vaccine>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedIndex = null;
  selectedCountryVaccine: Vaccine;
  iso3List: any;

  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    this.iso3List = await this.appService.iso3List;
    const response:ApiResponse<Vaccine[]> = await this.appService.getAllVaccine();
    if(response.status) {
      this.VaccineList = response.data;
      this.dataSource = new MatTableDataSource(this.VaccineList!);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    console.log(this.VaccineList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchVaccine(searchText: string) {
    const filteredList: any[] | undefined = [];
    if (searchText.trim()) {
      this.displayedColumns.forEach((key: string) => {
        if (key !== 'sno') {
          this.VaccineList.filter((project: any) => {
            if (
              String(project[key])
                ?.toUpperCase()
                ?.indexOf(searchText.toUpperCase()) > -1
            ) {
              filteredList.push(project);
            }
            return;
          });
        }
      });
      this.dataSource = new MatTableDataSource(filteredList!);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource(this.VaccineList!);
      this.dataSource.paginator = this.paginator;    
      this.dataSource.sort = this.sort;
    }
  }

  pinCountry(data: Vaccine) {
    this.appService.pinCountryVaccine$.next(data);
  }

  selectCountry(data: Vaccine, i: number) {
    if(this.selectedIndex === i) {
      this.selectedIndex = null;
      this.selectedCountryVaccine = null;
      return;
    }
    this.selectedIndex = i;
    this.selectedCountryVaccine = data;
  }
}
