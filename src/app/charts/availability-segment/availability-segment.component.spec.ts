import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilitySegmentComponent } from './availability-segment.component';

describe('AvailabilitySegmentComponent', () => {
  let component: AvailabilitySegmentComponent;
  let fixture: ComponentFixture<AvailabilitySegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabilitySegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilitySegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
