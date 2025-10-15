import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociohomeTargetaperfilMinitarjetainfo } from './sociohome-targetaperfil-minitarjetainfo';

describe('SociohomeTargetaperfilMinitarjetainfo', () => {
  let component: SociohomeTargetaperfilMinitarjetainfo;
  let fixture: ComponentFixture<SociohomeTargetaperfilMinitarjetainfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SociohomeTargetaperfilMinitarjetainfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociohomeTargetaperfilMinitarjetainfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
