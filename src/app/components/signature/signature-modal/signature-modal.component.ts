import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";

import { MatButtonModule } from "@angular/material/button";
import { catchError, throwError } from "rxjs";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { SignatureElectronique } from "../../../models/signature-electronique";
import { SignatureService } from "../../../services/signature.service";
import { SignatureFormComponent } from "../signature-form/signature-form.component";

@Component({
  selector: "app-signature-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    SignatureFormComponent,
  ],
  templateUrl: "./signature-modal.component.html",
  styleUrls: ["./signature-modal.component.scss"],
})
export class SignatureModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SignatureModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      signature: SignatureElectronique | null;
      mode: "create" | "validate" | "reject";
    },
    private signatureService: SignatureService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(formValue: Partial<SignatureElectronique>): void {
    let operation;
    if (this.data.mode === "create") {
      if (formValue.loiCadreId) {
        operation = this.signatureService.createLoiSignature(
          formValue.loiCadreId!,
          formValue.signataireId!,
          formValue.circuitId!
        );
      } else if (formValue.mouvementId) {
        operation = this.signatureService.createMouvementSignature(
          formValue.mouvementId!,
          formValue.signataireId!,
          formValue.circuitId!
        );
      } else {
        this.snackBar.open(
          "Error: Either Loi Cadre or Mouvement ID is required",
          "Close",
          { duration: 5000 }
        );
        return;
      }
    } else if (this.data.mode === "validate") {
      operation = this.signatureService.validate(this.data.signature!.id!);
    } else {
      operation = this.signatureService.reject(
        this.data.signature!.id!,
        formValue.motifRejet!
      );
    }

    operation
      .pipe(
        catchError((err) => {
          const message =
            err.status === 400
              ? "Error: Invalid signature data. Check required fields or circuit ID."
              : `Error processing signature: ${err.message}`;
          this.snackBar.open(message, "Close", { duration: 5000 });
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          const successMessage =
            this.data.mode === "create"
              ? "Signature created successfully"
              : this.data.mode === "validate"
              ? "Signature validated successfully"
              : "Signature rejected successfully";
          this.snackBar.open(successMessage, "Close", { duration: 2000 });
          this.dialogRef.close(true);
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
