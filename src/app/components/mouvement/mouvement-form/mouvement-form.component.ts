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
import { Observable, of } from "rxjs";
import { switchMap, startWith } from "rxjs/operators";
import { LoiCadre } from "../../../models/loi-cadre";
import {
  Mouvement,
  TypeMouvement,
  StatutMouvement,
} from "../../../models/mouvement";
import { PosteBudgetaire, PosteBudgetaireDto } from "../../../models/poste-budgetaire";
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
  originPost?: PosteBudgetaireDto | null;
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
    // When loiCadre changes, load postes for that loi
    this.postes$ = this.mouvementForm.get("loiCadreId")!.valueChanges.pipe(
      startWith(null),
      switchMap((loiCadreId) =>
        loiCadreId
          ? this.posteBudgetaireService.getByLoiCadre(loiCadreId)
          : this.posteBudgetaireService.getAll()
      )
    );
    this.utilisateurs$ = this.utilisateurService.getAll();

    // react to type changes to adjust visible fields and validators
    this.mouvementForm.get("type")!.valueChanges.pipe(startWith(this.mouvementForm.get("type")!.value)).subscribe(() => {
      this.applyTypeRules();
    });

    // when origin post changes, fetch its details to validate effectif limits
    this.mouvementForm.get("posteOrigineId")!.valueChanges.subscribe((id) => {
      if (id) {
        this.posteBudgetaireService.getById(id).subscribe({
          next: (p) => {
            this.originPost = p;
            this.checkEffectifLimit();
          },
          error: () => {
            this.originPost = null;
            this.checkEffectifLimit();
          },
        });
      } else {
        this.originPost = null;
        this.checkEffectifLimit();
      }
    });
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

  // UI helpers
  showOrigine(): boolean {
    const t = this.mouvementForm.get("type")!.value as TypeMouvement;
    return [
      TypeMouvement.SUPPRESSION,
      TypeMouvement.TRANSFERT,
      TypeMouvement.TRANSFORMATION_DES_OCCUPES,
      TypeMouvement.TRANSFORMATION_DES_VACANTS,
    ].includes(t);
  }

  showDestination(): boolean {
    const t = this.mouvementForm.get("type")!.value as TypeMouvement;
    return [
      TypeMouvement.CREATION,
      TypeMouvement.TRANSFERT,
      TypeMouvement.TRANSFORMATION_DES_OCCUPES,
      TypeMouvement.TRANSFORMATION_DES_VACANTS,
    ].includes(t);
  }

  // apply field-level validators depending on selected type
  applyTypeRules(): void {
    const type = this.mouvementForm.get("type")!.value as TypeMouvement;

    // reset validators
    this.mouvementForm.get("posteOrigineId")!.clearValidators();
    this.mouvementForm.get("posteDestinationId")!.clearValidators();

    if (type === TypeMouvement.CREATION) {
      this.mouvementForm.get("posteDestinationId")!.setValidators([Validators.required]);
      // origin should be empty for creation
      this.mouvementForm.get("posteOrigineId")!.setValue(null, { emitEvent: false });
    } else if (type === TypeMouvement.SUPPRESSION) {
      this.mouvementForm.get("posteOrigineId")!.setValidators([Validators.required]);
      this.mouvementForm.get("posteDestinationId")!.setValue(null, { emitEvent: false });
    } else {
      // for TRANSFERT and TRANSFORMATIONS both are required
      this.mouvementForm.get("posteOrigineId")!.setValidators([Validators.required]);
      this.mouvementForm.get("posteDestinationId")!.setValidators([Validators.required]);
    }

    this.mouvementForm.get("posteOrigineId")!.updateValueAndValidity({ onlySelf: true });
    this.mouvementForm.get("posteDestinationId")!.updateValueAndValidity({ onlySelf: true });

    // re-check effectif limit after changing rules
    this.checkEffectifLimit();
  }

  // check effectif against origin post depending on mouvement type
  checkEffectifLimit(): void {
    const type = this.mouvementForm.get("type")!.value as TypeMouvement;
    const effectifCtrl = this.mouvementForm.get("effectif");
    const effectif = Number(effectifCtrl!.value) || 0;

    // clear custom error
    const currentErrors = effectifCtrl!.errors || {};
    delete currentErrors['exceedsOrigin'];

    if (!this.originPost) {
      effectifCtrl!.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
      return;
    }

    const origin = this.originPost;
    // assume origin.effectifFinal represents current occupied positions
    const originCurrent = origin.effectifFinal;
    // assume vacant = effectifInitial - effectifFinal (may be <=0)
    const originVacant = Math.max(0, origin.effectifInitial - origin.effectifFinal);

    let allowed = Infinity;
    if (type === TypeMouvement.SUPPRESSION || type === TypeMouvement.TRANSFERT) {
      allowed = originCurrent;
    } else if (type === TypeMouvement.TRANSFORMATION_DES_OCCUPES) {
      allowed = originCurrent;
    } else if (type === TypeMouvement.TRANSFORMATION_DES_VACANTS) {
      allowed = originVacant;
    }

    if ((type === TypeMouvement.SUPPRESSION || type === TypeMouvement.TRANSFERT || type === TypeMouvement.TRANSFORMATION_DES_OCCUPES || type === TypeMouvement.TRANSFORMATION_DES_VACANTS) && effectif > allowed) {
      effectifCtrl!.setErrors({ ...currentErrors, exceedsOrigin: { allowed, actual: effectif } });
    } else {
      effectifCtrl!.setErrors(Object.keys(currentErrors).length ? currentErrors : null);
    }
  }

  get effectifAllowed(): number | null {
    const errors = this.mouvementForm.get('effectif')?.errors as any;
    return errors && errors.exceedsOrigin ? errors.exceedsOrigin.allowed : null;
  }

  get formValue(): Mouvement {
    return this.mouvementForm.value as Mouvement;
  }
}
