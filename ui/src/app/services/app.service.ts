import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { Case } from '../models/case.interface';
import { Vaccine } from '../models/vaccine.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  userLocation: any;
  isoList: any;
  iso3List: any;
  pinCountryCase$ = new Subject<Case>();
  pinCountryVaccine$ = new Subject<Vaccine>();
  constructor(private http: HttpClient) { }

  async getUserCountry() {
    const response = await this.http.get('https://freegeoip.app/json').toPromise();
    this.userLocation = response;
  }

  async getIsoList() {
    const response = await this.http.get('/assets/json/iso.json').toPromise();
    this.isoList = response;
  }

  async getIso3List() {
    const response = await this.http.get('/assets/json/iso3.json').toPromise();
    this.iso3List = response;
  }

  async getWorldCases(): Promise<any> {
    return await this.http.get(`${environment.apiEndPoint}case/world`).toPromise();
  }

  async getUserCountryCases(): Promise<any> {
    return await this.http.get(`${environment.apiEndPoint}case/current/${this.userLocation.country_code}`).toPromise();
  }
  
  async getUserCountryTimeSeries(code: string): Promise<any> {
    return await this.http.get(`${environment.apiEndPoint}case/userCountryTimeSeriesData/${code}`).toPromise();
  }

  async getallCases(): Promise<any> {
    return await this.http.get(`${environment.apiEndPoint}case/all`).toPromise();
  }

  async getPinnedCountryCases(): Promise<any> {
    const storedData = this.getPinnedCaseCountries();
    if(!storedData.length) {
      return {
        status: true,
        data: []
      };
    }

    return await this.http.post(`${environment.apiEndPoint}case/pinned`, {
      country: storedData
    }).toPromise();
  }

  getPinnedCaseCountries() {
    const storedData = localStorage.getItem('pinnecCountryCase');
    if(storedData) {
      return JSON.parse(storedData);
    } else {
      localStorage.setItem('pinnecCountryCase', JSON.stringify([]));
      return [];
    }
  }

  setPinnedCaseCountries(code: string) {
    const countries = this.getPinnedCaseCountries();
    countries.push(code);
    localStorage.setItem('pinnecCountryCase', JSON.stringify(countries));
  }

  removePinnedCaseCountries(code: string) {
    const countries: string[] = this.getPinnedCaseCountries();
    countries.splice(countries.indexOf(code), 1);
    localStorage.setItem('pinnecCountryCase', JSON.stringify(countries));
  }

  // Vaccine
  async getWorldVaccine(): Promise<any> {
    return await this.http.get(`${environment.apiEndPoint}vaccine/world`).toPromise();
  }

  async getUserCountryVaccine(): Promise<any> {
    return await this.http.get(`${environment.apiEndPoint}vaccine/current/${this.isoList[this.userLocation.country_code]}`).toPromise();
  }
  
  async getUserAllStateCases(): Promise<any> {
    return await this.http.get(`${environment.apiEndPoint}case/userCountryData`).toPromise();
  }

  async getAllVaccine(): Promise<any> {
    return await this.http.get(`${environment.apiEndPoint}vaccine/all`).toPromise();
  }

  async getPinnedCountryVaccine(): Promise<any> {
    const storedData = this.getPinnedVaccineCountries();
    if(!storedData.length) {
      return {
        status: true,
        data: []
      };
    }

    return await this.http.post(`${environment.apiEndPoint}vaccine/pinned`, {
      country: storedData
    }).toPromise();
  }

  getPinnedVaccineCountries() {
    const storedData = localStorage.getItem('pinnedCountryVaccine');
    if(storedData) {
      return JSON.parse(storedData);
    } else {
      localStorage.setItem('pinnedCountryVaccine', JSON.stringify([]));
      return [];
    }
  }

  setPinnedVaccineCountries(code: string) {
    const countries = this.getPinnedVaccineCountries();
    countries.push(code);
    localStorage.setItem('pinnedCountryVaccine', JSON.stringify(countries));
  }

  removePinnedVaccineCountries(code: string) {
    const countries: string[] = this.getPinnedVaccineCountries();
    console.log(countries);
    countries.splice(countries.indexOf(code), 1);
    console.log(countries);
    localStorage.setItem('pinnedCountryVaccine', JSON.stringify(countries));
  }
}
