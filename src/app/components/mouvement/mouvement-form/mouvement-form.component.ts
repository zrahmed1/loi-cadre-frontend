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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { switchMap, startWith } from "rxjs/operators";
import { LoiCadre } from "../../../models/loi-cadre";
import {
  Mouvement,
  TypeMouvement,
  StatutMouvement,
} from "../../../models/mouvement";
import { PosteBudgetaire } from "../../../models/poste-budgetaire";
import { Utilisateur } from "../../../models/utilisateur";
import { LoiCadreService } from "../../../services/loi-cadre.service";
import { PosteBudgetaireService } from "../../../services/poste-budgetaire.service";
import { UtilisateurService } from "../../../services/utilisateur.service";

@Component({
  selector: "app-mouvement-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: "./mouvement-form.component.html",
  styleUrls: ["./mouvement-form.component.scss"],
})
export class MouvementFormComponent implements OnInit {
  @Input() mouvement: Mouvement | null = null;
  mouvementForm: FormGroup;
  typeMouvementValues: TypeMouvement[] = Object.values(TypeMouvement);
  statutMouvementValues: StatutMouvement[] = Object.values(StatutMouvement);
  loisCadres$: Observable<LoiCadre[]>;
  postes$: Observable<PosteBudgetaire[]>;
  utilisateurs$: Observable<Utilisateur[]>;

  constructor(
    private fb: FormBuilder,
    private loiCadreService: LoiCadreService,
    private posteBudgetaireService: PosteBudgetaireService,
    private utilisateurService: UtilisateurService
  ) {
    this.mouvementForm = this.fb.group({
      type: ["", Validators.required],
      description: [""],
      dateEffet: ["", Validators.required],
      posteOrigineId: [null],
      posteDestinationId: [null],
      effectif: ["", [Validators.required, Validators.min(1)]],
      status: ["", Validators.required],
      loiCadreId: ["", Validators.required],
      creeParId: ["", Validators.required],
    });
    this.loisCadres$ = this.loiCadreService.getAll();
    this.postes$ = this.mouvementForm.get("loiCadreId")!.valueChanges.pipe(
      startWith(null),
      switchMap((loiCadreId) =>
        loiCadreId
          ? this.posteBudgetaireService.getByLoiCadre(loiCadreId)
          : this.posteBudgetaireService.getAll()
      )
    );
    this.utilisateurs$ = this.utilisateurService.getAll();
  }

  ngOnInit(): void {
    if (this.mouvement) {
      this.mouvementForm.patchValue({
        type: this.mouvement.type,
        description: this.mouvement.description,
        dateEffet: this.mouvement.dateEffet,
        posteOrigineId: this.mouvement.posteOrigineId,
        posteDestinationId: this.mouvement.posteDestinationId,
        effectif: this.mouvement.effectif,
        status: this.mouvement.status,
        loiCadreId: this.mouvement.loiCadreId,
        creeParId: this.mouvement.creeParId,
      });
    }
  }

  get formValue(): Mouvement {
    return this.mouvementForm.value as Mouvement;
  }
}
