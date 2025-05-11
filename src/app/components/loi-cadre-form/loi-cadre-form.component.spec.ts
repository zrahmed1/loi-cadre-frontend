import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoiCadreFormComponent } from './loi-cadre-form.component';

describe('LoiCadreFormComponent', () => {
  let component: LoiCadreFormComponent;
  let fixture: ComponentFixture<LoiCadreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoiCadreFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoiCadreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
