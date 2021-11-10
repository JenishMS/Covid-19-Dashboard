import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { ApiResponse } from "../models/api-response.model";
import { Case } from "../models/case.interface";
import { ApppService } from "../services/app.service";
import { CaseService } from "../services/case.service";

@JsonController('/case')
@Service()
export class CaseController {
    constructor(private caseService: CaseService) {

    }

    @Get('/world')
    async worldWideCases() {
        const worldCaseData: ApiResponse<Case> = await this.caseService.getWorldWideCases();
        return worldCaseData;
    }

    @Get('/current/:code')
    async userCountry(@Param('code') code: string) {
        const caseData: ApiResponse<any> = await this.caseService.getCountryCases(code);
        if(caseData.status) {
            const countryData = await this.caseService.getCountryCasesData(caseData.data?.countryInfo.iso3);
            caseData.data = {
                ...caseData.data,
                ...countryData
            }
        }
        return caseData;
    }
    @Get('/all')
    async countryWiseCases() {
        const worldCaseData: ApiResponse<Case[]> = await this.caseService.getAllCountriesCases();
        return worldCaseData;
    }

    @Get('/userCountryData')
    async userCountryCaseData() {
        const indiaStateCases: ApiResponse<Case[]> = await this.caseService.getIUserAllStateCases();
        return indiaStateCases;
    }

    @Post('/pinned')
    async pinnedCountryCases(@Body() data: {country: string[]}) {
        const worldCaseData: ApiResponse<Case[]> = await this.caseService.getPinnedCountryCases(data);
        return worldCaseData;
    }
}