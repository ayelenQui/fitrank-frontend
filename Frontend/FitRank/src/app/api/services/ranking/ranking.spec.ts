import { TestBed } from '@angular/core/testing';

import { RankingService } from '@app/api/services/ranking/ranking.service';

describe('Ranking', () => {
  let service: RankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
