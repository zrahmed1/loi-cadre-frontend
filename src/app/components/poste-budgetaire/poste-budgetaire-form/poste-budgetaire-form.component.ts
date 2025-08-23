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
import { Grade } from "../../../models/grade";
import { LoiCadre } from "../../../models/loi-cadre";
import { PosteBudgetaire, EtatPoste } from "../../../models/poste-budgetaire";
import { EtablissementService } from "../../../services/etablissement.service";
import { GradeService } from "../../../services/grade.service";
import { LoiCadreService } from "../../../services/loi-cadre.service";

@Component({
  selector: "app-poste-budgetaire-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: "./poste-budgetaire-form.component.html",
  styleUrls: ["./poste-budgetaire-form.component.scss"],
})
export class PosteBudgetaireFormComponent implements OnInit {
  @Input() poste: PosteBudgetaire | null = null;
  posteForm: FormGroup;
  etatPosteValues: EtatPoste[] = Object.values(EtatPoste);
  loisCadres$: Observable<LoiCadre[]>;
  grades$: Observable<Grade[]>;
  etablissements$: Observable<Etablissement[]>;

  constructor(
    private fb: FormBuilder,
    private loiCadreService: LoiCadreService,
    private gradeService: GradeService,
    private etablissementService: EtablissementService
  ) {
    this.posteForm = this.fb.group({
      codePoste: ["", [Validators.required, Validators.pattern(/^[A-Z0-9]+$/)]],
      description: [""],
      effectifInitial: ["", [Validators.required, Validators.min(0)]],
      effectifFinal: ["", [Validators.required, Validators.min(0)]],
      etat: ["", Validators.required],
      loiCadreId: ["", Validators.required],
      gradeId: ["", Validators.required],
      etablissementId: ["", Validators.required],
    });
    this.loisCadres$ = this.loiCadreService.getAll();
    this.grades$ = this.gradeService.getAll();
    this.etablissements$ = this.etablissementService.getAll();
  }

  ngOnInit(): void {
    if (this.poste) {
      this.posteForm.patchValue({
        codePoste: this.poste.codePoste,
        description: this.poste.description,
        effectifInitial: this.poste.effectifInitial,
        effectifFinal: this.poste.effectifFinal,
        etat: this.poste.etat,
        loiCadreId: this.poste.loiCadreId,
        gradeId: this.poste.gradeId,
        etablissementId: this.poste.etablissementId,
      });
    }
  }

  get formValue(): PosteBudgetaire {
    return this.posteForm.value as PosteBudgetaire;
  }
}
