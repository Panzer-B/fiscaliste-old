import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDailyCommuteComponent } from './person-daily-commute.component';

describe('PersonDailyCommuteComponent', () => {
  let component: PersonDailyCommuteComponent;
  let fixture: ComponentFixture<PersonDailyCommuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDailyCommuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDailyCommuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
