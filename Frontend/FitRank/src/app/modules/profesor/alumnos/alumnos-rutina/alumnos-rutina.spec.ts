import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosRutina } from './alumnos-rutina';

describe('AlumnosRutina', () => {
  let component: AlumnosRutina;
  let fixture: ComponentFixture<AlumnosRutina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnosRutina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosRutina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
