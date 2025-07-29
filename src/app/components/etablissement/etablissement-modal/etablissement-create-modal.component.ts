import { Component, Inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { EtablissementService } from "../../../services/etablissement.service";
import { Departement } from "../../../models/departement";
import { DepartementService } from "../../../services/departement.service";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Utilisateur } from "../../../models/utilisateur";
import { UtilisateurService } from "../../../services/utilisateur.service";

@Component({
  selector: "app-etablissement-create-modal",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: "./etablissement-create-modal.component.html",
  styleUrls: ["./etablissement-create-modal.component.scss"],
})
export class EtablissementCreateModalComponent {
  etablissementForm: FormGroup;
  departements: Departement[] = [];
  utilisateurs: Utilisateur[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EtablissementCreateModalComponent>,
    private etablissementService: EtablissementService,
    private departementService: DepartementService,
    private utilisateurService: UtilisateurService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.etablissementForm = this.fb.group({
      nom: ["", Validators.required],
      userID: ["", Validators.required],
      departementIds: [[], Validators.required],
    });
  }

  ngOnInit() {
    this.utilisateurService
      .getAll()
      .subscribe((users) => (this.utilisateurs = users));

    this.departementService
      .getAll()
      .subscribe((depts) => (this.departements = depts));
  }

  onSubmit(): void {
    if (this.etablissementForm.valid) {
      this.etablissementService.create(this.etablissementForm.value).subscribe({
        next: () => this.dialogRef.close("refresh"),
        error: () => alert("Erreur lors de la création de l’établissement"),
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
