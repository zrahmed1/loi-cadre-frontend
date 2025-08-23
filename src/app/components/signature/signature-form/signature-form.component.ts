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
import { LoiCadre } from "../../../models/loi-cadre";
import { Mouvement } from "../../../models/mouvement";
import {
  SignatureElectronique,
  StatutSignature,
} from "../../../models/signature-electronique";
import { Utilisateur } from "../../../models/utilisateur";
import { LoiCadreService } from "../../../services/loi-cadre.service";
import { MouvementService } from "../../../services/mouvement.service";
import { UtilisateurService } from "../../../services/utilisateur.service";

@Component({
  selector: "app-signature-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: "./signature-form.component.html",
  styleUrls: ["./signature-form.component.scss"],
})
export class SignatureFormComponent implements OnInit {
  @Input() signature: SignatureElectronique | null = null;
  @Input() mode: "create" | "validate" | "reject" = "create";
  signatureForm: FormGroup;
  statutSignatureValues: StatutSignature[] = Object.values(StatutSignature);
  loisCadres$: Observable<LoiCadre[]>;
  mouvements$: Observable<Mouvement[]>;
  utilisateurs$: Observable<Utilisateur[]>;

  constructor(
    private fb: FormBuilder,
    private loiCadreService: LoiCadreService,
    private mouvementService: MouvementService,
    private utilisateurService: UtilisateurService
  ) {
    this.signatureForm = this.fb.group(
      {
        loiCadreId: [null],
        mouvementId: [null],
        signataireId: ["", Validators.required],
        status: [StatutSignature.EN_ATTENTE, Validators.required],
        ordre: ["", [Validators.required, Validators.min(1)]],
        circuitId: ["", [Validators.required, Validators.min(1)]],
        motifRejet: [""],
      },
      { validators: this.atLeastOneIdValidator }
    );
    this.loisCadres$ = this.loiCadreService.getAll();
    this.mouvements$ = this.mouvementService.getAll();
    this.utilisateurs$ = this.utilisateurService.getAll();
  }

  ngOnInit(): void {
    if (this.signature) {
      this.signatureForm.patchValue({
        loiCadreId: this.signature.loiCadreId,
        mouvementId: this.signature.mouvementId,
        signataireId: this.signature.signataireId,
        status: this.signature.status,
        ordre: this.signature.ordre,
        circuitId: this.signature.circuitId,
        motifRejet: this.signature.motifRejet,
      });
    }
    if (this.mode === "validate") {
      this.signatureForm.patchValue({ status: StatutSignature.SIGNE });
      this.signatureForm.disable();
      this.signatureForm.get("status")!.enable();
    } else if (this.mode === "reject") {
      this.signatureForm.patchValue({ status: StatutSignature.REJETE });
      this.signatureForm.disable();
      this.signatureForm.get("status")!.enable();
      this.signatureForm.get("motifRejet")!.enable();
      this.signatureForm
        .get("motifRejet")!
        .setValidators([Validators.required]);
    }
  }

  atLeastOneIdValidator(form: FormGroup) {
    const loiCadreId = form.get("loiCadreId")?.value;
    const mouvementId = form.get("mouvementId")?.value;
    return loiCadreId || mouvementId ? null : { atLeastOneId: true };
  }

  get formValue(): Partial<SignatureElectronique> {
    return this.signatureForm.value as Partial<SignatureElectronique>;
  }
}
