import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdrRankingComponent } from './bdr-ranking.component';

describe('BdrRankingComponent', () => {
  let component: BdrRankingComponent;
  let fixture: ComponentFixture<BdrRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdrRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdrRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
