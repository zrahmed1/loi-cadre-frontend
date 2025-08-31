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
import { UtilisateurFormComponent } from "../utilisateur-form/utilisateur-form.component";
import { Utilisateur, SaveUserRequest, UtilisateurRequest } from "../../../models/utilisateur";
import { UtilisateurService } from "../../../services/utilisateur.service";

@Component({
  selector: "app-utilisateur-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    UtilisateurFormComponent,
  ],
  templateUrl: "./utilisateur-modal.component.html",
  styleUrls: ["./utilisateur-modal.component.scss"],
})
export class UtilisateurModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UtilisateurModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { utilisateur: Utilisateur | null },
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(formValue: Utilisateur): void {
    // Map form value to request interface
    const updateRequest: UtilisateurRequest = {
      nom: formValue.nom,
      prenom: formValue.prenom,
      email: formValue.email,
      role: formValue.role,
      active: formValue.active !== false, // default to true if not set
      etablissementId: formValue.etablissementId,
      departementId: formValue.departementId
    };

    const createRequest: SaveUserRequest = {
      nom: formValue.nom,
      prenom: formValue.prenom,
      email: formValue.email,
      motDePasse: formValue.motDePasse || '',
      role: formValue.role,
      etablissementId: formValue.etablissementId
    };

    const operation = this.data.utilisateur
      ? this.utilisateurService.update(this.data.utilisateur.id!, updateRequest)
      : this.utilisateurService.create(createRequest);

    operation
      .pipe(
        catchError((err) => {
          const message =
            err.status === 400
              ? "Error: Invalid utilisateur data. Check email uniqueness or required fields."
              : `Error saving utilisateur: ${err.message}`;
          this.snackBar.open(message, "Close", { duration: 5000 });
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            this.data.utilisateur
              ? "Utilisateur updated successfully"
              : "Utilisateur created successfully",
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
