import { ComponentFixture, TestBed } from "@angular/core/testing";
import { EtablissementCreateModalComponent } from "./etablissement-create-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EtablissementService } from "../../../services/etablissement.service";
import { of } from "rxjs";

describe("EtablissementCreateModalComponent", () => {
  let component: EtablissementCreateModalComponent;
  let fixture: ComponentFixture<EtablissementCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtablissementCreateModalComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy("close") },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: EtablissementService, useValue: { create: () => of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EtablissementCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should call onSubmit when form is valid", () => {
    component.etablissementForm.setValue({ nom: "Test", departementId: 1 });
    spyOn(component["etablissementService"], "create").and.returnValue(of({}));
    component.onSubmit();
    expect(component["dialogRef"].close).toHaveBeenCalledWith("refresh");
  });
});
