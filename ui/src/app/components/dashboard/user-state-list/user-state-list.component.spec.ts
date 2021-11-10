import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStateListComponent } from './user-state-list.component';

describe('UserStateListComponent', () => {
  let component: UserStateListComponent;
  let fixture: ComponentFixture<UserStateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
