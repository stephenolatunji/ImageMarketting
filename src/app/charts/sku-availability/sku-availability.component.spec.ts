import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuAvailabilityComponent } from './sku-availability.component';

describe('SkuAvailabilityComponent', () => {
  let component: SkuAvailabilityComponent;
  let fixture: ComponentFixture<SkuAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkuAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkuAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
