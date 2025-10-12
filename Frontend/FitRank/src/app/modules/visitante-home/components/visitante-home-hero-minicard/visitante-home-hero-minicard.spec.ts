import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeHeroMinicard } from './visitante-home-hero-minicard';

describe('VisitanteHomeHeroMinicard', () => {
  let component: VisitanteHomeHeroMinicard;
  let fixture: ComponentFixture<VisitanteHomeHeroMinicard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeHeroMinicard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeHeroMinicard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
