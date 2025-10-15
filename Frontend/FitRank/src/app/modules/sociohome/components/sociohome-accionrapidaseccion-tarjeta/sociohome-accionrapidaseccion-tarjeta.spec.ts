import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociohomeAccionrapidaseccionTarjeta } from './sociohome-accionrapidaseccion-tarjeta';

describe('SociohomeAccionrapidaseccionTarjeta', () => {
  let component: SociohomeAccionrapidaseccionTarjeta;
  let fixture: ComponentFixture<SociohomeAccionrapidaseccionTarjeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SociohomeAccionrapidaseccionTarjeta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociohomeAccionrapidaseccionTarjeta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
