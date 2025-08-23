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
import { MouvementFormComponent } from "../mouvement-form/mouvement-form.component";
import { Mouvement } from "../../../models/mouvement";
import { MouvementService } from "../../../services/mouvement.service";

@Component({
  selector: "app-mouvement-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    MouvementFormComponent,
  ],
  templateUrl: "./mouvement-modal.component.html",
  styleUrls: ["./mouvement-modal.component.scss"],
})
export class MouvementModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MouvementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mouvement: Mouvement | null },
    private mouvementService: MouvementService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(formValue: Mouvement): void {
    const operation = this.data.mouvement
      ? this.mouvementService.update(this.data.mouvement.id!, formValue)
      : this.mouvementService.create(formValue.loiCadreId!, formValue);

    operation
      .pipe(
        catchError((err) => {
          const message =
            err.status === 400
              ? "Error: Invalid mouvement data. Check required fields or loi cadre status."
              : `Error saving mouvement: ${err.message}`;
          this.snackBar.open(message, "Close", { duration: 5000 });
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            this.data.mouvement
              ? "Mouvement updated successfully"
              : "Mouvement created successfully",
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
