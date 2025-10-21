import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSesionesRutina } from './crear-sesiones-rutina';

describe('CrearSesionesRutina', () => {
  let component: CrearSesionesRutina;
  let fixture: ComponentFixture<CrearSesionesRutina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSesionesRutina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearSesionesRutina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
