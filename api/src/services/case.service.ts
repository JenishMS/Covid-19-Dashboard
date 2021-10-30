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