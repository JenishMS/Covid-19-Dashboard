import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AppService } from "./app.service";

@Injectable({ providedIn: 'root' })
export class AppResolver implements Resolve<any> {
  constructor(private appService: AppService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    this.appService.getIsoList();
    this.appService.getIso3List();
    return this.appService.getUserCountry();
  }
}