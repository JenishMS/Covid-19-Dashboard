import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCountryVaccineComponent } from './all-country-vaccine.component';

describe('AllCountryVaccineComponent', () => {
  let component: AllCountryVaccineComponent;
  let fixture: ComponentFixture<AllCountryVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCountryVaccineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCountryVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
