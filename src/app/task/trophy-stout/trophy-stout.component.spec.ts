import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrophyStoutComponent } from './trophy-stout.component';

describe('TrophyStoutComponent', () => {
  let component: TrophyStoutComponent;
  let fixture: ComponentFixture<TrophyStoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrophyStoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrophyStoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
