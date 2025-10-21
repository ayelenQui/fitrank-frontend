import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSeriesSesion } from './crear-series-sesion';

describe('CrearSeriesSesion', () => {
  let component: CrearSeriesSesion;
  let fixture: ComponentFixture<CrearSeriesSesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSeriesSesion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearSeriesSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
