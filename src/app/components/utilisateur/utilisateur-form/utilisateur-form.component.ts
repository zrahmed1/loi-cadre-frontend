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
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { Departement } from "../../../models/departement";
import { Etablissement } from "../../../models/etablissement";
import { Utilisateur, Role } from "../../../models/utilisateur";
import { DepartementService } from "../../../services/departement.service";
import { EtablissementService } from "../../../services/etablissement.service";
import { UtilisateurService } from "../../../services/utilisateur.service";

@Component({
  selector: "app-utilisateur-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  templateUrl: "./utilisateur-form.component.html",
  styleUrls: ["./utilisateur-form.component.scss"],
})
export class UtilisateurFormComponent implements OnInit {
  @Input() utilisateur: Utilisateur | null = null;
  utilisateurForm: FormGroup;
  roles: Role[] = Object.values(Role);
  etablissements$: Observable<Etablissement[]>;
  departements$: Observable<Departement[]>;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private departementService: DepartementService,
    private etablissementService: EtablissementService
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      motDePasse: [
        "",
        this.utilisateur ? [] : [Validators.required, Validators.minLength(6)],
      ],
      role: ["", Validators.required],
      active: [true],
      etablissementId: [null],
      departementId: [null],
    });
    this.etablissements$ = this.etablissementService.getAll();
    this.departements$ = this.departementService.getAll();
  }

  ngOnInit(): void {
    if (this.utilisateur) {
      this.utilisateurForm.patchValue({
        nom: this.utilisateur.nom,
        prenom: this.utilisateur.prenom,
        email: this.utilisateur.email,
        role: this.utilisateur.role,
        active: this.utilisateur.active,
        etablissementId: this.utilisateur.etablissementId,
        departementId: this.utilisateur.departementId,
      });
    }
  }

  get formValue(): Utilisateur {
    return this.utilisateurForm.value as Utilisateur;
  }
}
