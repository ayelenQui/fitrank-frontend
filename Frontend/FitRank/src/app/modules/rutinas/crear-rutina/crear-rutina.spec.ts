import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CrearRutinaComponent } from './crear-rutina';

describe('CrearRutinaComponent', () => {
  let component: CrearRutinaComponent;
  let fixture: ComponentFixture<CrearRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRutinaComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('seleccionar() debería asignar el tipo', () => {
    component.seleccionar('manual');
    expect(component.seleccion).toBe('manual');
  });

  it('empezar() debería navegar o alertar según selección', () => {
    spyOn(window, 'alert');
    component.seleccion = 'automatica';
    component.empezar();
    expect(window.alert).toHaveBeenCalledWith('Rutina automática aún no disponible.');
  });
});
