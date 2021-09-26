import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalSummaryComponent } from './statistical-summary.component';

describe('StatisticalSummaryComponent', () => {
  let component: StatisticalSummaryComponent;
  let fixture: ComponentFixture<StatisticalSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticalSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
