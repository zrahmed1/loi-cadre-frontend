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
import { DepartementFormComponent } from "../departement-form/departement-form.component";
import { Departement } from "../../../models/departement";
import { DepartementService } from "../../../services/departement.service";

@Component({
  selector: "app-departement-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    DepartementFormComponent,
  ],
  templateUrl: "./departement-create-modal.component.html",
  styleUrls: ["./departement-create-modal.component.scss"],
})
export class DepartementModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DepartementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { departement: Departement | null },
    private departementService: DepartementService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(formValue: Departement): void {
    const operation = this.data.departement
      ? this.departementService.update(this.data.departement.id!, formValue)
      : this.departementService.create(formValue);

    operation
      .pipe(
        catchError((err) => {
          const message =
            err.status === 409
              ? "Error: Code already exists for this etablissement. Please use a unique code."
              : `Error saving departement: ${err.message}`;
          this.snackBar.open(message, "Close", { duration: 5000 });
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            this.data.departement
              ? "Departement updated successfully"
              : "Departement created successfully",
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
