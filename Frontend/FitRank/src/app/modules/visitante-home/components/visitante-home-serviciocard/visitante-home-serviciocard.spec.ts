import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeServiciocard } from './visitante-home-serviciocard';

describe('VisitanteHomeServiciocard', () => {
  let component: VisitanteHomeServiciocard;
  let fixture: ComponentFixture<VisitanteHomeServiciocard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeServiciocard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeServiciocard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
