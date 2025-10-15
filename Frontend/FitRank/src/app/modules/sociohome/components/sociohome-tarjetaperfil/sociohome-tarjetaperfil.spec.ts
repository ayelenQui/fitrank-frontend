import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociohomeTarjetaperfil } from './sociohome-tarjetaperfil';

describe('SociohomeTarjetaperfil', () => {
  let component: SociohomeTarjetaperfil;
  let fixture: ComponentFixture<SociohomeTarjetaperfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SociohomeTarjetaperfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociohomeTarjetaperfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
