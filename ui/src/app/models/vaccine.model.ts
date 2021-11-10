export interface Vaccine {
    total: number;
    daily: number;
    date?: string;
    vaccinated?: number;
    fullyVaccinated?: number;
    country?: string;
    iso?: string;
    continent?: string;
    population?: number;
    percentage?: number;
    vaccinatedPercentage?: number;
    fullyVaccinatedPercentage?: number;
}