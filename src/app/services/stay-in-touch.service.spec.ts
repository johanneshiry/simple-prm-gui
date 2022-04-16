import { TestBed } from '@angular/core/testing';

import { StayInTouchService } from './stay-in-touch.service';

describe('StayInTouchService', () => {
  let service: StayInTouchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StayInTouchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
