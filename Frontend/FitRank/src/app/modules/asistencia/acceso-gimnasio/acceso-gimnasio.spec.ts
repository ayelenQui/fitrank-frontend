import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesoGimnasio } from './acceso-gimnasio';

describe('AccesoGimnasio', () => {
  let component: AccesoGimnasio;
  let fixture: ComponentFixture<AccesoGimnasio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesoGimnasio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccesoGimnasio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
