import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAccionrapidaseccion } from './home-accionrapidaseccion';

describe('HomeAccionrapidaseccion', () => {
  let component: HomeAccionrapidaseccion;
  let fixture: ComponentFixture<HomeAccionrapidaseccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAccionrapidaseccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAccionrapidaseccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});