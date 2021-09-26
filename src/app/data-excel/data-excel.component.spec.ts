import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExcelComponent } from './data-excel.component';

describe('DataExcelComponent', () => {
  let component: DataExcelComponent;
  let fixture: ComponentFixture<DataExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
