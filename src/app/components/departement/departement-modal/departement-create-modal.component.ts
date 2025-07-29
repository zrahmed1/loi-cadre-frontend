import { Component, Inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

import { DepartementService } from "../../../services/departement.service";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { Departement } from "../../../models/departement";
import { Utilisateur } from "../../../models/utilisateur";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "app-departement-create-modal",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: "./departement-create-modal.component.html",
  styleUrls: ["./departement-create-modal.component.scss"],
})
export class DepartementCreateModalComponent implements OnInit {
  departementForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepartementCreateModalComponent>,
    private departementService: DepartementService,
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Departement
  ) {
    this.departementForm = this.fb.group({
      nom: ["", Validators.required],
      userID: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.utilisateurService
      .getAll()
      .subscribe((users) => (this.utilisateurs = users));

    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.departementForm.patchValue({
        nom: this.data.nom,
        userID: this.data.userID,
      });
    }
  }

  onSubmit(): void {
    if (this.departementForm.invalid) return;

    const payload = this.departementForm.value;

    if (this.isEditMode) {
      this.departementService.update(this.data.id!, payload).subscribe({
        next: () => {
          this.snackBar.open("Département modifié avec succès", "Fermer", {
            duration: 3000,
            panelClass: "snackbar-success",
          });
          this.dialogRef.close("refresh");
        },
        error: () => {
          this.snackBar.open(
            "Erreur lors de la modification du département",
            "Fermer",
            {
              duration: 3000,
              panelClass: "snackbar-error",
            }
          );
        },
      });
    } else {
      this.departementService.create(payload).subscribe({
        next: () => {
          this.snackBar.open("Département créé avec succès", "Fermer", {
            duration: 3000,
            panelClass: "snackbar-success",
          });
          this.dialogRef.close("refresh");
        },
        error: () => {
          this.snackBar.open(
            "Le responsable est déjà assigné à un autre département",
            "Fermer",
            {
              duration: 3000,
              panelClass: "snackbar-error",
            }
          );
        },
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
