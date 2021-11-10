import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedCountriesComponent } from './pinned-countries.component';

describe('PinnedCountriesComponent', () => {
  let component: PinnedCountriesComponent;
  let fixture: ComponentFixture<PinnedCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinnedCountriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
