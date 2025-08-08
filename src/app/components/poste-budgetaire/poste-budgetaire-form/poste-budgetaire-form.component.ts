import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Etablissement } from "../../../models/etablissement";
import { Grade } from "../../../models/grade";
import { LoiCadre } from "../../../models/loi-cadre";
import { EtatPoste, PosteBudgetaire } from "../../../models/poste-budgetaire";
import { EtablissementService } from "../../../services/etablissement.service";
import { GradeService } from "../../../services/grade.service";
import { LoiCadreService } from "../../../services/loi-cadre.service";
import { PosteBudgetaireService } from "../../../services/poste-budgetaire.service";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
@Component({
  selector: "app-poste-budgetaire-form",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: "./poste-budgetaire-form.component.html",
  styleUrls: ["./poste-budgetaire-form.component.scss"],
})
export class PosteBudgetaireFormComponent implements OnInit {
  posteForm: FormGroup;
  grades: Grade[] = [];
  etablissements: Etablissement[] = [];
  lois: LoiCadre[] = [];
  etats = Object.values(EtatPoste);
  id: number | null = null;

  constructor(
    private posteBudgetaireService: PosteBudgetaireService,
    private gradeService: GradeService,
    private etablissementService: EtablissementService,
    private loiCadreService: LoiCadreService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.posteForm = this.fb.group({
      codePoste: ["", Validators.required],
      gradeId: [null],
      etat: [EtatPoste.VACANT, Validators.required],
      effectifInitial: [0, [Validators.required, Validators.min(0)]],
      effectifFinal: [0, [Validators.required, Validators.min(0)]],
      etablissementId: [null],
      loiCadreId: [null],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    if (this.id) {
      this.posteBudgetaireService
        .getById(this.id)
        .subscribe((poste) => this.posteForm.patchValue(poste));
    }
    this.gradeService.getAll().subscribe((grades) => (this.grades = grades));
    this.etablissementService
      .getAll()
      .subscribe((etabs) => (this.etablissements = etabs));
    this.loiCadreService.getAll().subscribe((lois) => (this.lois = lois));
    const loiCadreId = this.route.snapshot.queryParams["loiCadreId"];
    if (loiCadreId) this.posteForm.patchValue({ loiCadreId: +loiCadreId });
  }

  save() {
    if (this.posteForm.valid) {
      const poste = this.posteForm.value as PosteBudgetaire;
      if (this.id) {
        this.posteBudgetaireService
          .update(this.id, poste)
          .subscribe(() => this.navigateBack());
      } else {
        this.posteBudgetaireService
          .create(poste)
          .subscribe(() => this.navigateBack());
      }
    }
  }

  navigateBack() {
    const loiCadreId = this.route.snapshot.queryParams["loiCadreId"];
    this.router.navigate(
      loiCadreId ? ["/loi-cadre", loiCadreId] : ["/lois-cadres"]
    );
  }
}
