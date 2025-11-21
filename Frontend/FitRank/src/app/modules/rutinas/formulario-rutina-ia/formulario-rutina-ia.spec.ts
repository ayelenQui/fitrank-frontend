import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRutinaIa } from './formulario-rutina-ia';

describe('FormularioRutinaIa', () => {
  let component: FormularioRutinaIa;
  let fixture: ComponentFixture<FormularioRutinaIa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioRutinaIa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRutinaIa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
