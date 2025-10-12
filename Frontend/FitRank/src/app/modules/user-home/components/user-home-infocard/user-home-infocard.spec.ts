import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeInfocard } from './user-home-infocard';

describe('UserHomeInfocard', () => {
  let component: UserHomeInfocard;
  let fixture: ComponentFixture<UserHomeInfocard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeInfocard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeInfocard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
