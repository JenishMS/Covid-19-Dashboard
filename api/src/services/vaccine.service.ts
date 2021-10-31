import axios from "axios";
import { Service } from "typedi";
import { ApiResponse } from "../models/api-response.model";
import { Vaccine } from "../models/vaccine.model";
import { ApppService } from "./app.service";

@Service()
export class VaccineService {
    constructor(private appService: ApppService) {}

    async getWorldWideCases(): Promise<ApiResponse<Vaccine>> {
        const response = await axios.get(`${process.env.diseaseEndPoint}vaccine/coverage?lastdays=2&fullData=true`);
        if(response.status === 200) {
            response.data = this.appService.formatVaccinationData(response.data[0]);

            return this.appService.success<any>(response.data);
        }else {
            return this.appService.error();
        }
    }

    async getVaccinaitionByCountry(countryCode: string): Promise<ApiResponse<Vaccine>> {
        const response = await axios.get(`${process.env.diseaseEndPoint}vaccine/coverage/countries/${countryCode}?lastdays=2&fullData=true`);
        if(response.status === 200) {
            const data = {
                    country: response.data.country,
                    data: this.appService.formatVaccinationData(response.data.timeline[0])
                }
            return this.appService.success<Vaccine>(data);
        } else {
            return this.appService.error();
        }
    }

    async getAllCountriesVaccination(): Promise<ApiResponse<Vaccine[]>> {
        const response = await axios.get(`${process.env.diseaseEndPoint}vaccine/coverage/countries?lastdays=2&fullData=true`);
        if(response.status === 200) {
            const formatedCasesList: Vaccine[] = response.data.map((data: any) => {
                return {
                    country: data.country,
                    data: this.appService.formatVaccinationData(data.timeline[0])
                };
            });
            return this.appService.success<Vaccine[]>(formatedCasesList);
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
}