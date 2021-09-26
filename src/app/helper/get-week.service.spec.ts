import { TestBed } from '@angular/core/testing';

import { GetWeekService } from './get-week.service';

describe('GetWeekService', () => {
  let service: GetWeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
