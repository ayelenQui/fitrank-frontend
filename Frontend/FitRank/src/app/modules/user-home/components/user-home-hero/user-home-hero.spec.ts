import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeHero } from './user-home-hero';

describe('UserHomeHero', () => {
  let component: UserHomeHero;
  let fixture: ComponentFixture<UserHomeHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeHero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
