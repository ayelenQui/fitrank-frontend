import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRutina } from './editar-rutina';

describe('EditarRutina', () => {
  let component: EditarRutina;
  let fixture: ComponentFixture<EditarRutina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRutina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarRutina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
