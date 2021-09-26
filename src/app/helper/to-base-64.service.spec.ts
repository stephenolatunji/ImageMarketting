import { TestBed } from '@angular/core/testing';

import { ToBase64Service } from './to-base-64.service';

describe('ToBase64Service', () => {
  let service: ToBase64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToBase64Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
