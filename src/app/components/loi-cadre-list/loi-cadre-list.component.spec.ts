import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoiCadreListComponent } from './loi-cadre-list.component';

describe('LoiCadreListComponent', () => {
  let component: LoiCadreListComponent;
  let fixture: ComponentFixture<LoiCadreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoiCadreListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoiCadreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
