import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeNavbar } from './visitante-home-navbar';

describe('VisitanteHomeNavbar', () => {
  let component: VisitanteHomeNavbar;
  let fixture: ComponentFixture<VisitanteHomeNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
