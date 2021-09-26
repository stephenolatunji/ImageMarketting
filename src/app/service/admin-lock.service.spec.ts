import { TestBed } from '@angular/core/testing';

import { AdminLockService } from './admin-lock.service';

describe('AdminLockService', () => {
  let service: AdminLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
