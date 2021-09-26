import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCamComponent } from './test-cam.component';

describe('TestCamComponent', () => {
  let component: TestCamComponent;
  let fixture: ComponentFixture<TestCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
