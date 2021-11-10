import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserCountryComponent } from './components/user-country/user-country.component';
import { EconomyComponent } from './components/economy/economy.component';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { BaseComponent } from './components/base/base.component';
import { CaseCardComponent } from './components/dashboard/case-card/case-card.component';
import { CountryCaseCardComponent } from './components/dashboard/country-case-card/country-case-card.component';
import { PinnedCountriesComponent } from './components/dashboard/pinned-countries/pinned-countries.component';
import { AllCountryCasesComponent } from './components/dashboard/all-country-cases/all-country-cases.component';
import { AllCountryVaccineComponent } from './components/vaccine/all-country-vaccine/all-country-vaccine.component';
import { VaccineCardComponent } from './components/vaccine/vaccine-card/vaccine-card.component';
import { VaccinePinnedCountriesComponent } from './components/vaccine/vaccine-pinned-countries/vaccine-pinned-countries.component';
import { UserStateListComponent } from './components/dashboard/user-state-list/user-state-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    UserCountryComponent,
    EconomyComponent,
    VaccineComponent,
    BaseComponent,
    CaseCardComponent,
    CountryCaseCardComponent,
    PinnedCountriesComponent,
    AllCountryCasesComponent,
    VaccineCardComponent,
    VaccinePinnedCountriesComponent,
    AllCountryVaccineComponent,
    UserStateListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
