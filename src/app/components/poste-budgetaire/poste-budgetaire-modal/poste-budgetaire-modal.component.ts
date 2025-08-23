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
import { PosteBudgetaireFormComponent } from "../poste-budgetaire-form/poste-budgetaire-form.component";
import { PosteBudgetaire } from "../../../models/poste-budgetaire";
import { PosteBudgetaireService } from "../../../services/poste-budgetaire.service";

@Component({
  selector: "app-poste-budgetaire-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    PosteBudgetaireFormComponent,
  ],
  templateUrl: "./poste-budgetaire-modal.component.html",
  styleUrls: ["./poste-budgetaire-modal.component.scss"],
})
export class PosteBudgetaireModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PosteBudgetaireModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { poste: PosteBudgetaire | null },
    private posteBudgetaireService: PosteBudgetaireService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(formValue: PosteBudgetaire): void {
    const operation = this.data.poste
      ? this.posteBudgetaireService.update(this.data.poste.id!, formValue)
      : this.posteBudgetaireService.create(formValue);

    operation
      .pipe(
        catchError((err) => {
          const message =
            err.status === 400
              ? "Error: Invalid poste data. Check required fields or codePoste uniqueness."
              : `Error saving poste: ${err.message}`;
          this.snackBar.open(message, "Close", { duration: 5000 });
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            this.data.poste
              ? "Poste updated successfully"
              : "Poste created successfully",
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
