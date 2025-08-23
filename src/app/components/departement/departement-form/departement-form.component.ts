import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { Departement } from "../../../models/departement";
import { Etablissement } from "../../../models/etablissement";
import { Utilisateur } from "../../../models/utilisateur";
import { EtablissementService } from "../../../services/etablissement.service";
import { UtilisateurService } from "../../../services/utilisateur.service";

@Component({
  selector: "app-departement-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: "./departement-form.component.html",
  styleUrls: ["./departement-form.component.scss"],
})
export class DepartementFormComponent implements OnInit {
  @Input() departement: Departement | null = null;
  departementForm: FormGroup;
  etablissements$: Observable<Etablissement[]>;
  utilisateurs$: Observable<Utilisateur[]>;

  constructor(
    private fb: FormBuilder,
    private etablissementService: EtablissementService,
    private utilisateurService: UtilisateurService
  ) {
    this.departementForm = this.fb.group({
      code: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9]{10}$/),
          Validators.maxLength(10),
        ],
      ],
      nom: ["", [Validators.required, Validators.maxLength(100)]],
      etablissementId: ["", Validators.required],
      responsable: [null],
    });
    this.etablissements$ = this.etablissementService.getAll();
    this.utilisateurs$ = this.utilisateurService.getAll();
  }

  ngOnInit(): void {
    if (this.departement) {
      this.departementForm.patchValue({
        code: this.departement.code,
        nom: this.departement.nom,
        etablissementId: this.departement.etablissementId,
        responsable: this.departement.responsable
          ? this.departement.responsable.id
          : null,
      });
    }
  }

  get formValue(): Departement {
    const value = this.departementForm.value as Omit<
      Departement,
      "responsable"
    > & { responsable: number | null };
    return {
      ...value,
      responsable: value.responsable
        ? { id: Number(value.responsable) }
        : undefined,
    };
  }
}
