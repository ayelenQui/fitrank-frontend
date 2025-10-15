import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarRutina } from './iniciar-rutina';

describe('IniciarRutina', () => {
  let component: IniciarRutina;
  let fixture: ComponentFixture<IniciarRutina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IniciarRutina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IniciarRutina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
