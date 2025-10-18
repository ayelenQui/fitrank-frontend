import { TestBed } from '@angular/core/testing';
import { EjercicioRealizadoService } from '../registroentrenamiento/registro-entrenamiento.service';


describe('Gimnasio', () => {
  let service: EjercicioRealizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjercicioRealizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
