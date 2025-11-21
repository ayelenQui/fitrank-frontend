import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRutinaAsistida } from './formulario-rutina-asistida';

describe('FormularioRutinaAsistida', () => {
  let component: FormularioRutinaAsistida;
  let fixture: ComponentFixture<FormularioRutinaAsistida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRutinaAsistida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRutinaAsistida);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
