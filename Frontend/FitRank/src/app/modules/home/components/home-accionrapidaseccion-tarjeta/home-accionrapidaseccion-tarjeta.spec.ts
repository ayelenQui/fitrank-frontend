import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAccionrapidaseccionTarjeta } from './home-accionrapidaseccion-tarjeta';

describe('HomeAccionrapidaseccionTarjeta', () => {
  let component: HomeAccionrapidaseccionTarjeta;
  let fixture: ComponentFixture<HomeAccionrapidaseccionTarjeta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAccionrapidaseccionTarjeta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAccionrapidaseccionTarjeta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});