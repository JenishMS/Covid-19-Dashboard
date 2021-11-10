import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinePinnedCountriesComponent } from './vaccine-pinned-countries.component';

describe('VaccinePinnedCountriesComponent', () => {
  let component: VaccinePinnedCountriesComponent;
  let fixture: ComponentFixture<VaccinePinnedCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinePinnedCountriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinePinnedCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
