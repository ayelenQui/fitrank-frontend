import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSesionesRutinaComponent } from './crear-sesiones-rutina';

describe('CrearSesionesRutina', () => {
  let component: CrearSesionesRutinaComponent;
  let fixture: ComponentFixture<CrearSesionesRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSesionesRutinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearSesionesRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
