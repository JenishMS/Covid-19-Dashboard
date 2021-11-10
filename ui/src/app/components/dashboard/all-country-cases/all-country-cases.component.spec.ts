import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCountryCasesComponent } from './all-country-cases.component';

describe('AllCountryCasesComponent', () => {
  let component: AllCountryCasesComponent;
  let fixture: ComponentFixture<AllCountryCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCountryCasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCountryCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
