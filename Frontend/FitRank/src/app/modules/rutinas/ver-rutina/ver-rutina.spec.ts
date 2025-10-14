import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRutina } from './ver-rutina';

describe('VerRutina', () => {
  let component: VerRutina;
  let fixture: ComponentFixture<VerRutina>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerRutina]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerRutina);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
