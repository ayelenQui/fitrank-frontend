import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeNavbar } from './user-home-navbar';

describe('UserHomeNavbar', () => {
  let component: UserHomeNavbar;
  let fixture: ComponentFixture<UserHomeNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
