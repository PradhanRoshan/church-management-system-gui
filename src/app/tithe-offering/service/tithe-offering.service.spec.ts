import { TestBed } from '@angular/core/testing';

import { TitheOfferingService } from './tithe-offering.service';

describe('TitheOfferingService', () => {
  let service: TitheOfferingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitheOfferingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
