import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogrosListarComponent } from './logros-listar-component';

describe('LogrosListarComponent', () => {
  let component: LogrosListarComponent;
  let fixture: ComponentFixture<LogrosListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogrosListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogrosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
