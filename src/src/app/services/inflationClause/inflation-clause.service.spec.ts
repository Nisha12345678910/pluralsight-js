import { TestBed } from '@angular/core/testing';

import { InflationClauseService } from './inflation-clause.service';

describe('InflationClauseService', () => {
  let service: InflationClauseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InflationClauseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
