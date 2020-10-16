import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueCostComponent } from './true-cost.component';

describe('TrueCostComponent', () => {
  let component: TrueCostComponent;
  let fixture: ComponentFixture<TrueCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrueCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrueCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
