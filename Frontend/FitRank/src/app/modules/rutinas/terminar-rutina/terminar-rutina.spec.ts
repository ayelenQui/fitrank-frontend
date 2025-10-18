import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminarRutinaComponent } from './terminar-rutina';


describe('TerminarRutina', () => {
  let component: TerminarRutinaComponent;
  let fixture: ComponentFixture<TerminarRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminarRutinaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminarRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
