import { TestBed } from '@angular/core/testing';

import { TimelineRestService } from './timeline-rest.service';

describe('TimelineRestService', () => {
  let service: TimelineRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
