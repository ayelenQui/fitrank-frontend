import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sociohome } from './sociohome';

describe('Sociohome', () => {
  let component: Sociohome;
  let fixture: ComponentFixture<Sociohome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sociohome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sociohome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
