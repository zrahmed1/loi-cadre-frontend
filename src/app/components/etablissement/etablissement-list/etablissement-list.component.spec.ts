import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementListComponent } from './etablissement-list.component';

describe('EtablissementListComponent', () => {
  let component: EtablissementListComponent;
  let fixture: ComponentFixture<EtablissementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtablissementListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtablissementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
