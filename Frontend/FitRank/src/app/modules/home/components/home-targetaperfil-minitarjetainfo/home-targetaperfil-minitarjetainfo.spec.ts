import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTargetaperfilMinitarjetainfo } from './home-targetaperfil-minitarjetainfo';

describe('HomeTargetaperfilMinitarjetainfo', () => {
  let component: HomeTargetaperfilMinitarjetainfo;
  let fixture: ComponentFixture<HomeTargetaperfilMinitarjetainfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTargetaperfilMinitarjetainfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTargetaperfilMinitarjetainfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});