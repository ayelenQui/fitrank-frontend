import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeCtaInfocard } from './visitante-home-cta-infocard';

describe('VisitanteHomeCtaInfocard', () => {
  let component: VisitanteHomeCtaInfocard;
  let fixture: ComponentFixture<VisitanteHomeCtaInfocard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeCtaInfocard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeCtaInfocard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
