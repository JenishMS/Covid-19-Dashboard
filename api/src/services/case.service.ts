import axios from "axios";
import { Service } from "typedi";
import { ApiResponse } from "../models/api-response.model";
import { Case } from "../models/case.interface";
import { ApppService } from "./app.service";

@Service()
export class CaseService {
    constructor(private appService: ApppService) {}

    async getWorldWideCases(): Promise<ApiResponse<Case>> {
        const response = await axios.get(`${process.env.diseaseEndPoint}all`);
        if(response.status === 200) {
            response.data = this.appService.formatCaseData(response.data);
            return this.appService.success<Case>(response.data);
        }else {
            return this.appService.error();
        }
    }

    async getCountryCases(countryCode: string): Promise<ApiResponse<Case>> {
        const response = await axios.get(`${process.env.diseaseEndPoint}countries/${countryCode}?strict=true`);
        if(response.status === 200) {
            response.data = this.appService.formatCaseData(response.data);
            return this.appService.success<Case>(response.data);
        } else {
            return this.appService.error();
        }
    }

    async getPinnedCountryCases(data: {country: string[]}): Promise<ApiResponse<Case[]>> {
        const response = await axios.get(`${process.env.diseaseEndPoint}countries`);
        if(response.status === 200) {
            const pinnedCountries = response.data.filter((countryData: Case) => {
                return data.country.includes(countryData.countryInfo?.iso2 as string);
            });
            const formatedCasesList: Case[] = pinnedCountries.map((data: Case) => {
                return this.appService.formatCaseData(data);
            });
            return this.appService.success<Case[]>(formatedCasesList);
        } else {
            this.appService.error([]);
        }
        return response.data;
    }
    async getIUserAllStateCases(): Promise<ApiResponse<Case[]>> {
        const responseState: any = await axios.get(`https://gist.githubusercontent.com/shubhamjain/35ed77154f577295707a/raw/7bc2a915cff003fb1f8ff49c6890576eee4f2f10/IndianStates.json`);
        const response = await axios.get(`https://data.covid19india.org/v4/min/data.min.json`);
        if(response.status === 200) {
            const keys = Object.keys(response.data);
            const formatedData = Object.values(response.data).map((data: any, index) => {
                return {...data, stateCode: keys[index], state: responseState.data[keys[index]]};});
            return this.appService.success<Case[]>(formatedData);
        } else {
            this.appService.error([]);
        }
        return response.data;
    }

    async getIUserCountryTimeSeries(code: string): Promise<ApiResponse<Case[]>> {
        const response = await axios.get(`https://data.covid19india.org/v4/min/timeseries.min.json`);
        if(response.status === 200) {
            const keys = Object.keys(response.data);
            return this.appService.success<Case[]>(response.data[code]);
        } else {
            this.appService.error([]);
        }
        return response.data;
    }

    async getCountryCasesData(countryCode: string): Promise<any> {
        const response = await axios.get(`${process.env.vaccineEndPoint}owid-covid-latest.csv`, { responseType: 'blob',});
        if(response.status === 200) {
            let returnData = {
                todayCases: 0,
                todayDeaths: 0
            };
            const file: any = response.data;
            const jsonData = this.appService.csvJSON(file);
            const filterVaccineData = jsonData.filter((data) => data.iso_code === countryCode);
            if(filterVaccineData.length) {
                returnData.todayCases = Number(filterVaccineData[0].new_cases);
                returnData.todayDeaths = Number(filterVaccineData[0].new_deaths);
            }
            return returnData;
        } else {
            return {};
        }
    }

    async getAllCountriesCases(): Promise<ApiResponse<Case[]>> {
        const response = await axios.get(`${process.env.diseaseEndPoint}countries`);
        if(response.status === 200) {
            const formatedCasesList: Case[] = response.data.map((data: Case) => {
                return this.appService.formatCaseData(data);
            });
            return this.appService.success<Case[]>(formatedCasesList);
        } else {
            this.appService.error([]);
        }
        return response.data;
    }
}