import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeCtasection } from './visitante-home-ctasection';

describe('VisitanteHomeCtasection', () => {
  let component: VisitanteHomeCtasection;
  let fixture: ComponentFixture<VisitanteHomeCtasection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeCtasection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeCtasection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
