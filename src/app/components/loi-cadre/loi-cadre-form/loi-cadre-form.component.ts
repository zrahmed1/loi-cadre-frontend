import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { StatutLoiCadre, LoiCadre } from "../../../models/loi-cadre";
import { Mouvement } from "../../../models/mouvement";
import { PosteBudgetaire } from "../../../models/poste-budgetaire";
import { LoiCadreService } from "../../../services/loi-cadre.service";
import { MouvementService } from "../../../services/mouvement.service";
import { PosteBudgetaireService } from "../../../services/poste-budgetaire.service";

// Angular Material
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";

import { Observable, forkJoin, of } from "rxjs";

@Component({
  selector: "app-loi-cadre-form",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: "./loi-cadre-form.component.html",
  styleUrls: ["./loi-cadre-form.component.scss"],
})
export class LoiCadreFormComponent implements OnInit {
  loiCadreForm: FormGroup;
  postes: PosteBudgetaire[] = [];
  mouvements: Mouvement[] = [];

  allPostes: PosteBudgetaire[] = [];
  allMouvements: Mouvement[] = [];

  statuts = Object.values(StatutLoiCadre);
  id: number | null = null;

  postesTouched = false;
  mouvementsTouched = false;

  // helper for version logic
  minVersion = 1;
  highestVersion = 1;

  constructor(
    private loiCadreService: LoiCadreService,
    private posteBudgetaireService: PosteBudgetaireService,
    private mouvementService: MouvementService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loiCadreForm = this.fb.group({
      annee: [
        new Date().getFullYear(),
        [Validators.required, Validators.min(2000)],
      ],
      version: [1, [Validators.required, Validators.min(1)]],
      statut: [StatutLoiCadre.INITIALE, Validators.required],
    });
  }

  ngOnInit() {
    // parse id as number (if present)
    const idParam = this.route.snapshot.params["id"];
    this.id = idParam ? Number(idParam) : null;

    // load postes and mouvements lists for selection
    this.posteBudgetaireService.getAll().subscribe((postes) => {
      this.allPostes = postes || [];
    });

    this.mouvementService.getAll().subscribe((mouvs) => {
      this.allMouvements = mouvs || [];
    });

    if (this.id) {
      // Editing existing loi cadre
      this.loiCadreService.getById(this.id).subscribe((loi) => {
        // ensure numeric values
        this.loiCadreForm.patchValue({
          annee: Number(loi.annee),
          version: Number(loi.version),
          statut: loi.statut,
        });
        this.postes = loi.postes ? [...loi.postes] : [];
        this.mouvements = loi.mouvements ? [...loi.mouvements] : [];
      });

      // also compute min version from existing lois so user can't set too low version when editing
      this.loiCadreService.getAll().subscribe((lois) => {
        if (lois && lois.length) {
          this.highestVersion = Math.max(...lois.map((l) => Number(l.version)));
          this.minVersion = this.highestVersion; // editing: allow equal or greater
        }
      });
    } else {
      // Creating new loi cadre - set version to highest existing version + 1
      this.loiCadreService.getAll().subscribe((lois) => {
        if (lois && lois.length) {
          this.highestVersion = Math.max(...lois.map((l) => Number(l.version)));
          const nextVersion = this.highestVersion + 1;
          this.loiCadreForm.get("version")?.setValue(nextVersion);
          this.minVersion = this.highestVersion + 1; // require at least nextVersion
        } else {
          this.loiCadreForm.get("version")?.setValue(1);
          this.minVersion = 1;
        }
      });
    }
  }

  save() {
    // mark selections so user can see errors if they forgot to choose
    this.postesTouched = true;
    this.mouvementsTouched = true;

    // basic form validity + required selection checks
    if (
      this.loiCadreForm.invalid ||
      this.postes.length === 0 ||
      this.mouvements.length === 0
    ) {
      return; // stop if invalid
    }

    // ensure numeric fields and send empty arrays for postes/mouvements on create/update
    const loiToSave: any = {
      ...this.loiCadreForm.value,
      annee: Number(this.loiCadreForm.value.annee),
      version: Number(this.loiCadreForm.value.version),
      postes: this.postes,
      mouvements: this.mouvements,
    };

    if (this.id) {
      // update existing
      this.loiCadreService.update(this.id, loiToSave).subscribe((loi) => {
        // ensure we have an id (use returned loi.id if available)
        this.id = loi?.id ? Number(loi.id) : this.id;
        // link selected postes/mouvements and navigate after completion
        this.linkSelectedEntities().subscribe(() => {
          this.router.navigate(["/lois-cadres"]);
        });
      });
    } else {
      // create new
      this.loiCadreService.create(loiToSave).subscribe((loi) => {
        this.id = loi?.id ? Number(loi.id) : null;
        // only try to link if we got an id back
        if (!this.id) {
          // fallback: navigate back (or you can show an error)
          this.router.navigate(["/lois-cadres"]);
          return;
        }
        this.linkSelectedEntities().subscribe(() => {
          this.router.navigate(["/lois-cadres"]);
        });
      });
    }
  }

  /**
   * Links selected postes & mouvements to the current loi (by calling the backend endpoints).
   * Returns an Observable that completes when all link requests are finished.
   */
  linkSelectedEntities(): Observable<any> {
    if (!this.id) return of(null);

    const requests: Observable<any>[] = [];

    // post each poste
    this.postes.forEach((poste) => {
      // send full poste object (backend expects a PosteBudgetaire in request body)
      requests.push(this.loiCadreService.addPoste(this.id!, poste));
    });

    // post each mouvement
    this.mouvements.forEach((mouv) => {
      requests.push(this.loiCadreService.addMouvement(this.id!, mouv));
    });

    if (requests.length === 0) {
      return of(null);
    }
    return forkJoin(requests);
  }

  // Sélection des postes
  togglePosteSelection(poste: PosteBudgetaire) {
    const index = this.postes.findIndex((p) => p.id === poste.id);
    if (index >= 0) {
      this.postes.splice(index, 1);
    } else {
      this.postes.push(poste);
    }
  }

  isPosteSelected(poste: PosteBudgetaire): boolean {
    return this.postes.some((p) => p.id === poste.id);
  }

  // Sélection des mouvements
  toggleMouvementSelection(mouv: Mouvement) {
    const index = this.mouvements.findIndex((m) => m.id === mouv.id);
    if (index >= 0) {
      this.mouvements.splice(index, 1);
    } else {
      this.mouvements.push(mouv);
    }
  }
  isMouvementSelected(mouv: Mouvement): boolean {
    return this.mouvements.some((m) => m.id === mouv.id);
  }
}
