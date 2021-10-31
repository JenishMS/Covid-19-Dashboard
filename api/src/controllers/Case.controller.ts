import { Get, JsonController, Param } from "routing-controllers";
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
        const worldCaseData: ApiResponse<Case> = await this.caseService.getCountryCases(code);
        return worldCaseData;
    }
    @Get('/all')
    async countryWiseCases() {
        const worldCaseData: ApiResponse<Case[]> = await this.caseService.getAllCountriesCases();
        return worldCaseData;
    }
}