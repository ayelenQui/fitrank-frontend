import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoAlumnos } from './progreso-alumnos';

describe('ProgresoAlumnos', () => {
  let component: ProgresoAlumnos;
  let fixture: ComponentFixture<ProgresoAlumnos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresoAlumnos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgresoAlumnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
