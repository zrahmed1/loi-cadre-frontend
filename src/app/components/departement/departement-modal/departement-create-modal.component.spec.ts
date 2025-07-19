import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtablissementService } from '../../../services/etablissement.service';
import { of } from 'rxjs';
import { DepartementCreateModalComponent } from './departement-create-modal.component';

describe('DepartementCreateModalComponent', () => {
  let component: DepartementCreateModalComponent
  let fixture: ComponentFixture<DepartementCreateModalComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartementCreateModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: EtablissementService, useValue: { create: () => of({}) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DepartementCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('should call onSubmit when form is valid', () => {
  //   component.departementFormed.setValue({ nom: 'Test', departementId: 1 });
  //   spyOn(component['departementFormed'], 'create').and.returnValue(of({}));
  //   component.onSubmit();
  //   expect(component['dialogRef'].close).toHaveBeenCalledWith('refresh');
  // });
});
