import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissemetFormComponent } from './etablissemet-form.component';

describe('EtablissemetFormComponent', () => {
  let component: EtablissemetFormComponent;
  let fixture: ComponentFixture<EtablissemetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtablissemetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtablissemetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
