import axios from "axios";
import { json } from "stream/consumers";
import { Service } from "typedi";
import { ApiResponse } from "../models/api-response.model";
import { Vaccine } from "../models/vaccine.model";
import { ApppService } from "./app.service";

@Service()
export class VaccineService {
    constructor(private appService: ApppService) {}

    async getWorldWideCases(): Promise<ApiResponse<Vaccine>> {
        const response = await axios.get(`${process.env.vaccineEndPoint}owid-covid-latest.csv`, { responseType: 'blob',});
        if(response.status === 200) {
            const file: any = response.data;
            const returnData: Vaccine = {
                total: 0,
                daily: 0,
                vaccinated: 0,
                fullyVaccinated: 0,
                population: 0,
                percentage: 0,
                vaccinatedPercentage: 0,
                fullyVaccinatedPercentage: 0
            }
            const jsonData = this.appService.csvJSON(file);
            jsonData.forEach(data => {
                returnData.daily += data.new_vaccinations_smoothed ? Number(data.new_vaccinations_smoothed) : 0;
                returnData.total += data.people_vaccinated ? Number(data.total_vaccinations) : 0;
                returnData.vaccinated += data.total_vaccinations ? Number(data.people_vaccinated) : 0 as any;
                returnData.fullyVaccinated += data.total_vaccinations ? Number(data.people_fully_vaccinated) : 0 as any;
                returnData.population += data.population ? Number(data.population) : 0 as any;
            });
            returnData.percentage = (returnData.total / Number(returnData.population)) * 100;
            returnData.vaccinatedPercentage = (Number(returnData.vaccinated) / Number(returnData.population)) * 100;
            returnData.fullyVaccinatedPercentage = (Number(returnData.fullyVaccinated) / Number(returnData.population)) * 100;              
            return this.appService.success<any>(returnData);
        }else {
            return this.appService.error();
        }
    }

    async getVaccinaitionByCountry(countryCode: string): Promise<ApiResponse<Vaccine>> {
        const response = await axios.get(`${process.env.vaccineEndPoint}owid-covid-latest.csv`, { responseType: 'blob',});
        if(response.status === 200) {
            const file: any = response.data;
            const jsonData = this.appService.csvJSON(file);
            let returnData: Vaccine = {
                daily: 0,
                total: 0,
                vaccinated: 0,
                fullyVaccinated: 0,
                population: 0,
                percentage: 0,
                vaccinatedPercentage: 0,
                fullyVaccinatedPercentage: 0
            };
            const filterVaccineData = jsonData.filter((data) => data.iso_code === countryCode);
            if(filterVaccineData.length) {
                returnData = this.appService.formatVaccinationData(filterVaccineData[0]);
            }
            return this.appService.success<Vaccine>(returnData);
        } else {
            return this.appService.error();
        }
    }

    async getAllCountriesVaccination(): Promise<ApiResponse<Vaccine[]>> {
        const response = await axios.get(`${process.env.vaccineEndPoint}owid-covid-latest.csv`, { responseType: 'blob',});
        
        if(response.status === 200) {
            const file: any = response.data;
            const jsonData = this.appService.csvJSON(file);
            let returnData: Vaccine = {
                daily: 0,
                total: 0,
                vaccinated: 0,
                fullyVaccinated: 0,
                population: 0,
                percentage: 0
            };
            const formatedVaccineData = jsonData.map((data) => this.appService.formatVaccinationData(data));
            return this.appService.success<Vaccine[]>(formatedVaccineData);
        } else {
            return this.appService.error([]);
        }
    }

    async getPinnedCountryVaccineData(countryCodes: string[]): Promise<ApiResponse<Vaccine[]>> {
        const response = await axios.get(`${process.env.vaccineEndPoint}owid-covid-latest.csv`, { responseType: 'blob',});
        
        if(response.status === 200) {
            const file: any = response.data;
            const jsonData = this.appService.csvJSON(file);
            let returnData: Vaccine = {
                daily: 0,
                total: 0,
                vaccinated: 0,
                fullyVaccinated: 0,
                population: 0,
                percentage: 0
            };
            const filterVaccineData = jsonData.filter((data) => {
                return countryCodes.includes(data.iso_code)});
            const formatedVaccineData = filterVaccineData.map((data) => this.appService.formatVaccinationData(data));
            return this.appService.success<Vaccine[]>(formatedVaccineData);
        } else {
            return this.appService.error([]);
        }
    }

    async getVaccineDetails() {
        const response = await axios.get(`${process.env.diseaseEndPoint}therapeutics`);
        if(response.status === 200) {
            return this.appService.success<Vaccine>(response.data);
        } else {
            return this.appService.error();
        }
    }

    async getIndiaTodayCases() {
        const response = await axios.get(`https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.csv`, { responseType: 'blob',});
        const data = {
            todayCases: 0,
            todayDeaths: 0,
            todayRecovered: 0
        };
        if(response.status === 200) {
            const file: any = response.data;
            // const csvStr = file.text();
            const jsonData = this.appService.csvJSON(file);
            const indiaData = jsonData.filter(data => data.iso_code === 'IND');
  
        }
        return data;
    }
}