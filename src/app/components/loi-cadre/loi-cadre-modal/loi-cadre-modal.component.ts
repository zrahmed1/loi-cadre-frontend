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
import { LoiCadreFormComponent } from "../loi-cadre-form/loi-cadre-form.component";
import { LoiCadre } from "../../../models/loi-cadre";
import { LoiCadreService } from "../../../services/loi-cadre.service";

@Component({
  selector: "app-loi-cadre-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    LoiCadreFormComponent,
  ],
  templateUrl: "./loi-cadre-modal.component.html",
  styleUrls: ["./loi-cadre-modal.component.scss"],
})
export class LoiCadreModalComponent {
  constructor(
    public dialogRef: MatDialogRef<LoiCadreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { loiCadre: LoiCadre | null },
    private loiCadreService: LoiCadreService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(formValue: LoiCadre): void {
    const operation = this.data.loiCadre
      ? this.loiCadreService.update(this.data.loiCadre.id!, formValue)
      : this.loiCadreService.create(formValue);

    operation
      .pipe(
        catchError((err) => {
          const message =
            err.status === 409
              ? "Error: Loi Cadre with this annee and version already exists."
              : `Error saving loi cadre: ${err.message}`;
          this.snackBar.open(message, "Close", { duration: 5000 });
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            this.data.loiCadre
              ? "Loi Cadre updated successfully"
              : "Loi Cadre created successfully",
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
