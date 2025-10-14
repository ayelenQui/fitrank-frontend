import { TestBed } from '@angular/core/testing';
import { EjercicioService } from './ejercicioService';

describe('Rutina', () => {
  let service: EjercicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
