import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";

import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { catchError, throwError } from "rxjs";
import { CommonModule } from "@angular/common";
import { EtablissementFormComponent } from "../etablissemet-form/etablissemet-form.component";
import { Etablissement, EtablissementRequest, SaveEtablissementRequest } from "../../../models/etablissement";
import { EtablissementService } from "../../../services/etablissement.service";

@Component({
  selector: "app-etablissement-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    EtablissementFormComponent,
  ],
  templateUrl: "./etablissement-create-modal.component.html",
  styleUrls: ["./etablissement-create-modal.component.scss"],
})
export class EtablissementModalComponent {
  constructor(
    public dialogRef: MatDialogRef<EtablissementModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { etablissement: Etablissement | null },
    private etablissementService: EtablissementService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(formValue: Etablissement): void {
    // Map form value to request interface
    const updateRequest: EtablissementRequest = {
      code: formValue.code,
      nom: formValue.nom,
      userId: formValue.userId || formValue.responsable?.id, // Use userId or responsable ID
      departementsId: formValue.departements?.map(d => d.id).filter(id => id !== undefined) as number[]
    };

    const createRequest: SaveEtablissementRequest = {
      code: formValue.code,
      nom: formValue.nom,
      userID: formValue.userId || formValue.responsable?.id, // Use correct property name
      departementsID: formValue.departements?.map(d => d.id).filter(id => id !== undefined) as number[]
    };

    const operation = this.data.etablissement
      ? this.etablissementService.update(this.data.etablissement.id!, updateRequest)
      : this.etablissementService.create(createRequest);

    operation
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error saving etablissement: " + err.message,
            "Close",
            { duration: 3000 }
          );
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            this.data.etablissement
              ? "Etablissement updated successfully"
              : "Etablissement created successfully",
            "Close",
            { duration: 2000 }
          );
          this.dialogRef.close(true);
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
