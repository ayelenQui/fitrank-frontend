import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeFooter } from './visitante-home-footer';

describe('VisitanteHomeFooter', () => {
  let component: VisitanteHomeFooter;
  let fixture: ComponentFixture<VisitanteHomeFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
