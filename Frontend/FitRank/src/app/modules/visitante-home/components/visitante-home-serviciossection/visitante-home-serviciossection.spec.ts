import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitanteHomeServiciossection } from './visitante-home-serviciossection';

describe('VisitanteHomeServiciossection', () => {
  let component: VisitanteHomeServiciossection;
  let fixture: ComponentFixture<VisitanteHomeServiciossection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitanteHomeServiciossection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitanteHomeServiciossection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
