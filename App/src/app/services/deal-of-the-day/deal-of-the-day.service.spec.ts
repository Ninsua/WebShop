import { TestBed, inject } from '@angular/core/testing';

import { DealOfTheDayService } from './deal-of-the-day.service';

describe('DealOfTheDayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealOfTheDayService]
    });
  });

  it('should be created', inject([DealOfTheDayService], (service: DealOfTheDayService) => {
    expect(service).toBeTruthy();
  }));
});
