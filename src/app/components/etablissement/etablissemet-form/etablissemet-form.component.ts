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
import { Etablissement } from "../../../models/etablissement";
import { Utilisateur } from "../../../models/utilisateur";
import { UtilisateurService } from "../../../services/utilisateur.service";

@Component({
  selector: "app-etablissement-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: "./etablissemet-form.component.html",
  styleUrls: ["./etablissemet-form.component.scss"],
})
export class EtablissementFormComponent implements OnInit {
  @Input() etablissement: Etablissement | null = null;
  etablissementForm: FormGroup;
  utilisateurs$: Observable<Utilisateur[]>;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService
  ) {
    this.etablissementForm = this.fb.group({
      code: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9]{10}$/),
          Validators.maxLength(10),
        ],
      ],
      nom: ["", [Validators.required, Validators.maxLength(100)]],
      responsable: [null],
    });
    this.utilisateurs$ = this.utilisateurService.getAll();
  }

  ngOnInit(): void {
    if (this.etablissement) {
      this.etablissementForm.patchValue({
        code: this.etablissement.code,
        nom: this.etablissement.nom,
        responsable: this.etablissement.responsable
          ? this.etablissement.responsable.id
          : null,
      });
    }
  }

  get formValue(): Etablissement {
    const value = this.etablissementForm.value as Omit<
      Etablissement,
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
