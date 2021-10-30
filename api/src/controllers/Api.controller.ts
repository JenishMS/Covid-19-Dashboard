import { Get, JsonController, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import axios from 'axios';
import { ApppService } from '../services/app.service';

@JsonController('/')
@Service()
export class ApiController {
    constructor(private appService: ApppService) {   
    }
    
    @Get('/')
    async home() {
        return 'Invalid request!';
    }
    @Get('dashboard')
    async dashboard() {
        const worldWideData: any = await axios.get(process.env.worldwideAPI as string);
    }
    @Get('cases')
    async access() {
        return 'Success';
    }
}
