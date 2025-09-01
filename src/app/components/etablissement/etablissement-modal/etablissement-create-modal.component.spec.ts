import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EtablissementModalComponent } from "./etablissement-create-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EtablissementService } from "../../../services/etablissement.service";
import { of } from "rxjs";

describe('EtablissementCreateModalComponent', () => {
  let fixture: ComponentFixture<EtablissementModalComponent>;
  let component: EtablissementModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtablissementModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EtablissementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
