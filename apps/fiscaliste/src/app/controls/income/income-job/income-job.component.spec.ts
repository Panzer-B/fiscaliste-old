import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeJobComponent } from './income-job.component';

describe('IncomeJobComponent', () => {
  let component: IncomeJobComponent;
  let fixture: ComponentFixture<IncomeJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
