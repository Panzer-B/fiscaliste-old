import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonWeeklyHoursComponent } from './person-weekly-hours.component';

describe('PersonWeeklyHoursComponent', () => {
  let component: PersonWeeklyHoursComponent;
  let fixture: ComponentFixture<PersonWeeklyHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonWeeklyHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonWeeklyHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
