import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/models/api-response.model';
import { Case } from 'src/app/models/case.interface';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-user-state-list',
  templateUrl: './user-state-list.component.html',
  styleUrls: ['./user-state-list.component.scss']
})
export class UserStateListComponent implements OnInit {
  caseList: Case[] = [];
  displayedColumns: string[] = ['sno', 'state', 'confirmed', 'deceased', 'recovered', 'tested', 'vaccinated1', 'vaccinated2', 'population'];
  dataSource = new MatTableDataSource<Case>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedIndex = null;
  selectedCountryCase: Case;

  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    const response:ApiResponse<Case[]> = await this.appService.getUserAllStateCases();
    if(response.status) {
      console.log(response.data);
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

}
