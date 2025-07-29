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
import { EtablissementService } from "../../../services/etablissement.service";
import { DepartementService } from "../../../services/departement.service";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { Utilisateur } from "../../../models/utilisateur";
import { Departement } from "../../../models/departement";
import { Etablissement } from "../../../models/etablissement";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";

@Component({
  selector: "app-etablissement-create-modal",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: "./etablissement-create-modal.component.html",
  styleUrls: ["./etablissement-create-modal.component.scss"],
})
export class EtablissementCreateModalComponent implements OnInit {
  etablissementForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  departements: Departement[] = [];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EtablissementCreateModalComponent>,
    private etablissementService: EtablissementService,
    private utilisateurService: UtilisateurService,
    private departementService: DepartementService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Etablissement
  ) {
    this.etablissementForm = this.fb.group({
      nom: ["", Validators.required],
      userID: [null, Validators.required],
      departementsID: [[], Validators.required],
    });
  }

  ngOnInit(): void {
    this.utilisateurService
      .getAll()
      .subscribe((users) => (this.utilisateurs = users));
    this.departementService
      .getAll()
      .subscribe((deps) => (this.departements = deps));

    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.etablissementForm.patchValue({
        nom: this.data.nom,
        userID: this.data.utilisateur?.id ?? null,
        departementsID: this.data.departements?.map((d: any) => d.id) ?? [],
      });
    }
  }

  onSubmit(): void {
    if (this.etablissementForm.invalid) return;

    const payload = this.etablissementForm.value;

    const request = this.isEditMode
      ? this.etablissementService.update(this.data.id!, payload)
      : this.etablissementService.create(payload);

    request.subscribe({
      next: () => {
        this.snackBar.open(
          `Établissement ${this.isEditMode ? "modifié" : "créé"} avec succès`,
          "Fermer",
          { duration: 3000, panelClass: "snackbar-success" }
        );
        this.dialogRef.close("refresh");
      },
      error: () => {
        this.snackBar.open(
          "Erreur lors de l'enregistrement de l'établissement",
          "Fermer",
          { duration: 3000, panelClass: "snackbar-error" }
        );
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
