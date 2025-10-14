import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRutinaManual } from './crear-rutina-manual';

describe('CrearRutinaManual', () => {
  let component: CrearRutinaManual;
  let fixture: ComponentFixture<CrearRutinaManual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRutinaManual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRutinaManual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
