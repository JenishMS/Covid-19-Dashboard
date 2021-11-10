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
        
        return {
            total: Math.round(data.total_vaccinations) || 0,
            daily: Math.round(data.new_vaccinations_smoothed) || 0,
            vaccinated: Math.round(data.people_vaccinated) || 0,
            fullyVaccinated: Math.round(data.people_fully_vaccinated) || 0,
            country: data.location as string,
            iso: data.iso_code,
            continent: data.continent,
            date: data.last_updated_date,
            population: Math.round(data.population),
            percentage: ((Math.round(data.total_vaccinations) || 0) / Math.round(data.population)) * 100,        
            vaccinatedPercentage: ((Math.round(data.people_vaccinated) || 0) / Math.round(data.population)) * 100,
            fullyVaccinatedPercentage: ((Math.round(data.people_fully_vaccinated) || 0) / Math.round(data.population)) * 100
        };
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

    csvJSON(csvStr: string){
  var lines=csvStr.split("\n");
  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj: any = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }
  return result; //JavaScript object
}
}
