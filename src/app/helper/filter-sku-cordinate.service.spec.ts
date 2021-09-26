import { TestBed } from '@angular/core/testing';

import { FilterSkuCordinateService } from './filter-sku-cordinate.service';

describe('FilterSkuCordinateService', () => {
  let service: FilterSkuCordinateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterSkuCordinateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
