import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoiCadre } from '../../../models/loi-cadre';
import { TypeMouvement, Mouvement } from '../../../models/mouvement';
import { PosteBudgetaire } from '../../../models/poste-budgetaire';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { MouvementService } from '../../../services/mouvement.service';
import { PosteBudgetaireService } from '../../../services/poste-budgetaire.service';

@Component({
  selector: 'app-mouvement-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './mouvement-form.component.html',
  styleUrls: ['./mouvement-form.component.scss']
})
export class MouvementFormComponent implements OnInit {
  mouvementForm: FormGroup;
  postes: PosteBudgetaire[] = [];
  lois: LoiCadre[] = [];
  types = Object.values(TypeMouvement);
  id: number | null = null;

  constructor(
    private mouvementService: MouvementService,
    private posteBudgetaireService: PosteBudgetaireService,
    private loiCadreService: LoiCadreService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.mouvementForm = this.fb.group({
      type: [TypeMouvement.CREATION, Validators.required],
      posteConcerneId: [null],
      dateEffet: ['', Validators.required],
      description: ['', Validators.required],
      loiCadreId: [null]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.mouvementService.getById(this.id).subscribe(mouv => this.mouvementForm.patchValue(mouv));
    }
    this.posteBudgetaireService.getAll().subscribe(postes => this.postes = postes);
    this.loiCadreService.getAll().subscribe(lois => this.lois = lois);
    const loiCadreId = this.route.snapshot.queryParams['loiCadreId'];
    if (loiCadreId) this.mouvementForm.patchValue({ loiCadreId: +loiCadreId });
  }

  save() {
    if (this.mouvementForm.valid) {
      const mouvement = this.mouvementForm.value as Mouvement;
      if (this.id) {
        this.mouvementService.update(this.id, mouvement).subscribe(() => this.router.navigate(['/mouvements']));
      } else {
        this.mouvementService.create(mouvement.loiCadreId!, mouvement).subscribe(() => this.router.navigate(['/mouvements']));
      }
    }
  }
}