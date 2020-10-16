import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNetComponent } from './total-net.component';

describe('TotalNetComponent', () => {
  let component: TotalNetComponent;
  let fixture: ComponentFixture<TotalNetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalNetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalNetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
