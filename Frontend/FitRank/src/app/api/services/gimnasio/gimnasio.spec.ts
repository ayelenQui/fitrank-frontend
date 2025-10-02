import { TestBed } from '@angular/core/testing';

import { Gimnasio } from './gimnasio';

describe('Gimnasio', () => {
  let service: Gimnasio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gimnasio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
