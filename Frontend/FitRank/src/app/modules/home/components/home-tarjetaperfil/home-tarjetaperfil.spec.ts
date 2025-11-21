import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTarjetaperfil } from './home-tarjetaperfil';

describe('HomeTarjetaperfil', () => {
  let component: HomeTarjetaperfil;
  let fixture: ComponentFixture<HomeTarjetaperfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTarjetaperfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTarjetaperfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});