import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdrPerWeekComponent } from './bdr-per-week.component';

describe('BdrPerWeekComponent', () => {
  let component: BdrPerWeekComponent;
  let fixture: ComponentFixture<BdrPerWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdrPerWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdrPerWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
