import { TestBed } from '@angular/core/testing';

import { CheckIfIsteamleaderService } from './check-if-isteamleader.service';

describe('CheckIfIsteamleaderService', () => {
  let service: CheckIfIsteamleaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckIfIsteamleaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
