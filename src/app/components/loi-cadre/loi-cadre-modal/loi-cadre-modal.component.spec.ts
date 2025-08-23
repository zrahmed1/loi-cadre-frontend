import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoiCadreModalComponent } from './loi-cadre-modal.component';

describe('LoiCadreModalComponent', () => {
  let component: LoiCadreModalComponent;
  let fixture: ComponentFixture<LoiCadreModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoiCadreModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoiCadreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
