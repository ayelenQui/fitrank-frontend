import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeInfosection } from './user-home-infosection';

describe('UserHomeInfosection', () => {
  let component: UserHomeInfosection;
  let fixture: ComponentFixture<UserHomeInfosection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHomeInfosection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeInfosection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
