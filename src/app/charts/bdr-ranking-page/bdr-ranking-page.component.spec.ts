import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdrRankingPageComponent } from './bdr-ranking-page.component';

describe('BdrRankingPageComponent', () => {
  let component: BdrRankingPageComponent;
  let fixture: ComponentFixture<BdrRankingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdrRankingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdrRankingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
