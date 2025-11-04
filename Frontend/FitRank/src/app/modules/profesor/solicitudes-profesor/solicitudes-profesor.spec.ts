import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesProfesor } from './solicitudes-profesor';

describe('SolicitudesProfesor', () => {
  let component: SolicitudesProfesor;
  let fixture: ComponentFixture<SolicitudesProfesor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesProfesor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesProfesor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
