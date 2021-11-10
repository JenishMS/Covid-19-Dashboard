import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCaseCardComponent } from './country-case-card.component';

describe('CountryCaseCardComponent', () => {
  let component: CountryCaseCardComponent;
  let fixture: ComponentFixture<CountryCaseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCaseCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCaseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
