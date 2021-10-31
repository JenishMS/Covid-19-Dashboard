import { Get, JsonController, Param } from "routing-controllers";
import { Service } from "typedi";
import { VaccineService } from "../services/vaccine.service";

@JsonController('/vaccine')
@Service()
export class VaccineController {
    constructor(private vaccineService: VaccineService) {}

    @Get('/')
    async getVaccineDetails() {
        const vaccineDetails = await this.vaccineService.getVaccineDetails();
        return vaccineDetails;
    }

    @Get('/world')
    async worldWideVaccine() {
        const worldWideData = await this.vaccineService.getWorldWideCases();
        return worldWideData;
    }

    @Get('/current/:code')
    async userCountry(@Param('code') code: string) {
        const userCountryData = await this.vaccineService.getVaccinaitionByCountry(code);
        return userCountryData;
    }

    @Get('/all')
    async countryWiseVaccination() {
        const allCountryData = await this.vaccineService.getAllCountriesVaccination();
        return allCountryData;
    }
}