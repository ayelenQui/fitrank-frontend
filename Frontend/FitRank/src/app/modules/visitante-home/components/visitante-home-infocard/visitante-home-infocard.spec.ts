import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeInfocard } from './visitante-home-infocard';

describe('VisitanteHomeInfocard', () => {
  let component: VisitanteHomeInfocard;
  let fixture: ComponentFixture<VisitanteHomeInfocard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeInfocard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeInfocard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
