import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeInfosection } from './visitante-home-infosection';

describe('VisitanteHomeInfosection', () => {
  let component: VisitanteHomeInfosection;
  let fixture: ComponentFixture<VisitanteHomeInfosection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeInfosection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeInfosection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
