import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCountryComponent } from './user-country.component';

describe('UserCountryComponent', () => {
  let component: UserCountryComponent;
  let fixture: ComponentFixture<UserCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
