import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogrosCrearComponent } from './logros-crear-component';

describe('LogrosCrearComponent', () => {
  let component: LogrosCrearComponent;
  let fixture: ComponentFixture<LogrosCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogrosCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogrosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
