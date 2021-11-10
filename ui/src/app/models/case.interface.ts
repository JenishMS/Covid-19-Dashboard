export interface Case {
    updated: number;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    tests: number;
    population: number;
    affectedCountries?: number;
    country?: string;
    countryInfo?: CountryInfo;
    continent?: string;
}

export interface CountryInfo {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
}
