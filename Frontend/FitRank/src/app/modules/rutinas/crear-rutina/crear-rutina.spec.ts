import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRutina } from './crear-rutina';

describe('CrearRutina', () => {
  let component: CrearRutina;
  let fixture: ComponentFixture<CrearRutina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRutina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRutina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
