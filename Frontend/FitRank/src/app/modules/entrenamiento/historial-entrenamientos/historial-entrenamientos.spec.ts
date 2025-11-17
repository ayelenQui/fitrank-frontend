import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEntrenamientos } from './historial-entrenamientos';

describe('HistorialEntrenamientos', () => {
  let component: HistorialEntrenamientos;
  let fixture: ComponentFixture<HistorialEntrenamientos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialEntrenamientos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialEntrenamientos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
