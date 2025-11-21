import { TestBed } from '@angular/core/testing';

import { RutinaService } from './rutinaService';

describe('Rutina', () => {
  let service: RutinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
