import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociohomeAccionrapidaseccion } from './sociohome-accionrapidaseccion';

describe('SociohomeAccionrapidaseccion', () => {
  let component: SociohomeAccionrapidaseccion;
  let fixture: ComponentFixture<SociohomeAccionrapidaseccion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SociohomeAccionrapidaseccion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociohomeAccionrapidaseccion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
