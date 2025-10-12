import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeHeroMinicard } from './user-home-hero-minicard';

describe('UserHomeHeroMinicard', () => {
  let component: UserHomeHeroMinicard;
  let fixture: ComponentFixture<UserHomeHeroMinicard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeHeroMinicard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeHeroMinicard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
