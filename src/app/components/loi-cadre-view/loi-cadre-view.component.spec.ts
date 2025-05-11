import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoiCadreViewComponent } from './loi-cadre-view.component';

describe('LoiCadreViewComponent', () => {
  let component: LoiCadreViewComponent;
  let fixture: ComponentFixture<LoiCadreViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoiCadreViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoiCadreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
