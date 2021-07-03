import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHourlyRateIncomeComponent } from './person-hourly-rate-income.component';

describe('PersonHourlyRateIncomeComponent', () => {
  let component: PersonHourlyRateIncomeComponent;
  let fixture: ComponentFixture<PersonHourlyRateIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonHourlyRateIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHourlyRateIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
