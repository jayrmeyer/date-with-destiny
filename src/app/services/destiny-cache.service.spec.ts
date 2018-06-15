import { TestBed, inject } from '@angular/core/testing';

import { DestinyCacheService } from './destiny-cache.service';

describe('DestinyCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DestinyCacheService]
    });
  });

  it('should be created', inject([DestinyCacheService], (service: DestinyCacheService) => {
    expect(service).toBeTruthy();
  }));
});
