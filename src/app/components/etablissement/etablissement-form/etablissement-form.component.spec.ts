import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementFormComponent } from './etablissement-form.component';

describe('EtablissementFormComponent', () => {
  let component: EtablissementFormComponent;
  let fixture: ComponentFixture<EtablissementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtablissementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtablissementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
