import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyLagerComponent } from './trophy-lager.component';

describe('TrophyLagerComponent', () => {
  let component: TrophyLagerComponent;
  let fixture: ComponentFixture<TrophyLagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrophyLagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrophyLagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
