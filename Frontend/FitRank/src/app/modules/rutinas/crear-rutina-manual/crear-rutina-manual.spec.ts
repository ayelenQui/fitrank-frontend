import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRutinaManualComponent } from './crear-rutina-manual';

describe('CrearRutinaManualComponent', () => {
  let component: CrearRutinaManualComponent;
  let fixture: ComponentFixture<CrearRutinaManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearRutinaManualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRutinaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
