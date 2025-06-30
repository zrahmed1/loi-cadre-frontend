import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatutLoiCadre, LoiCadre } from '../../../models/loi-cadre';
import { Mouvement } from '../../../models/mouvement';
import { PosteBudgetaire } from '../../../models/poste-budgetaire';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { MouvementService } from '../../../services/mouvement.service';
import { PosteBudgetaireService } from '../../../services/poste-budgetaire.service';

@Component({
  selector: 'app-loi-cadre-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './loi-cadre-form.component.html',
  styleUrls: ['./loi-cadre-form.component.scss']
})
export class LoiCadreFormComponent implements OnInit {
  loiCadreForm: FormGroup;
  postes: PosteBudgetaire[] = [];
  mouvements: Mouvement[] = [];
  statuts = Object.values(StatutLoiCadre);
  id: number | null = null;

  constructor(
    private loiCadreService: LoiCadreService,
    private posteBudgetaireService: PosteBudgetaireService,
    private mouvementService: MouvementService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loiCadreForm = this.fb.group({
      annee: [new Date().getFullYear(), [Validators.required, Validators.min(2000)]],
      version: [1, [Validators.required, Validators.min(1)]],
      statut: [StatutLoiCadre.INITIALE, Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.loiCadreService.getById(this.id).subscribe(loi => {
        this.loiCadreForm.patchValue(loi);
        this.postes = loi.postes || [];
        this.mouvements = loi.mouvements || [];
      });
    }
  }

  save() {
    if (this.loiCadreForm.valid) {
      const loiToSave = this.loiCadreForm.value as LoiCadre;
      if (this.id) {
        this.loiCadreService.update(this.id, loiToSave).subscribe(() => this.router.navigate(['/lois-cadres']));
      } else {
        this.loiCadreService.create(loiToSave).subscribe(loi => {
          this.id = loi.id !== undefined ? loi.id : null;
          this.addExistingPostesAndMouvements();
        });
      }
    }
  }

  addExistingPostesAndMouvements() {
    this.postes.forEach(poste => {
      this.loiCadreService.addPoste(this.id!, poste).subscribe();
    });
    this.mouvements.forEach(mouvement => {
      this.loiCadreService.addMouvement(this.id!, mouvement).subscribe();
    });
  }

  addPoste() {
    this.router.navigate(['/poste/create'], { queryParams: { loiCadreId: this.id } });
  }

  addMouvement() {
    this.router.navigate(['/mouvement/create'], { queryParams: { loiCadreId: this.id } });
  }
}