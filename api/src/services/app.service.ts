import { Service} from 'typedi';
import axios from 'axios';
import { Case } from '../models/case.interface';
import { ApiResponse } from '../models/api-response.model';
import { Vaccine } from '../models/vaccine.model';

@Service()
export class ApppService {
    constructor() {}

    formatCaseData(data: any): Case {
        delete data.casesPerOneMillion;
        delete data.deathsPerOneMillion;
        delete data.testsPerOneMillion;
        delete data.oneCasePerPeople;
        delete data.oneDeathPerPeople;
        delete data.oneTestPerPeople;
        delete data.activePerOneMillion;
        delete data.recoveredPerOneMillion;
        delete data.criticalPerOneMillion;
        return data;
    }

    formatVaccinationData(data: any): Vaccine {
        delete data.totalPerHundred;
        delete data.dailyPerMillion;
        return data;
    }

    success<T>(data: any, message = ''): ApiResponse<T> {
        return {
            status: true,
            message,
            data
        }
    }
    
    error(data = {}, message = ''): ApiResponse<any> {
        return {
            status: false,
            message,
            data
        }
    }
}
