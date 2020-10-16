import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyRateIncomeComponent } from './hourly-rate-income.component';

describe('HourlyRateIncomeComponent', () => {
  let component: HourlyRateIncomeComponent;
  let fixture: ComponentFixture<HourlyRateIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyRateIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyRateIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
