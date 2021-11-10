import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Case } from 'src/app/models/case.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-all-country-cases',
  templateUrl: './all-country-cases.component.html',
  styleUrls: ['./all-country-cases.component.scss']
})
export class AllCountryCasesComponent implements OnInit {
  caseList: Case[] = [];
  displayedColumns: string[] = ['sno', 'country', 'cases', 'active', 'deaths', 'recovered', 'population', 'action'];
  dataSource = new MatTableDataSource<Case>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedIndex = null;
  selectedCountryCase: Case;

  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    const response:ApiResponse<Case[]> = await this.appService.getallCases();
    if(response.status) {
      this.caseList = response.data;
      this.dataSource = new MatTableDataSource(this.caseList!);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    console.log(this.caseList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  searchCases(searchText: string) {
    const filteredList: any[] | undefined = [];
    if (searchText.trim()) {
      this.displayedColumns.forEach((key: string) => {
        if (key !== 'sno') {
          this.caseList.filter((project: any) => {
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
      this.dataSource = new MatTableDataSource(this.caseList!);
      this.dataSource.paginator = this.paginator;    
      this.dataSource.sort = this.sort;
    }
  }

  pinCountry(data: Case) {
    this.appService.pinCountryCase$.next(data);
  }

  selectCountry(data: Case, i: number) {
    if(this.selectedIndex === i) {
      this.selectedIndex = null;
      this.selectedCountryCase = null;
      return;
    }
    this.selectedIndex = i;
    this.selectedCountryCase = data;
  }

}
