import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureFormComponent } from './signature-form.component';

describe('SignatureFormComponent', () => {
  let component: SignatureFormComponent;
  let fixture: ComponentFixture<SignatureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignatureFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
