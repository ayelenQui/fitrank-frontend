import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeHero } from './visitante-home-hero';

describe('VisitanteHomeHero', () => {
  let component: VisitanteHomeHero;
  let fixture: ComponentFixture<VisitanteHomeHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
