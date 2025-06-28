import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MouvementService } from '../../../services/mouvement.service';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { PosteBudgetaireService } from '../../../services/poste-budgetaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Mouvement, TypeMouvement } from '../../../models/mouvement';
import { LoiCadre } from '../../../models/loi-cadre';
import { PosteBudgetaire } from '../../../models/poste-budgetaire';

@Component({
  selector: 'app-mouvement-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './mouvement-form.component.html',
  styleUrls: ['./mouvement-form.component.scss']
})
export class MouvementFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  types = Object.values(TypeMouvement);
  loisCadres: LoiCadre[] = [];
  postes: PosteBudgetaire[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private mouvementService: MouvementService,
    private loiCadreService: LoiCadreService,
    private posteService: PosteBudgetaireService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      posteConcerneId: ['', Validators.required],
      dateEffet: ['', Validators.required],
      description: ['', Validators.required],
      loiCadreId: [''] // Optional, can be set when creating
    });
  }

  ngOnInit(): void {
    this.loadData();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.isEditMode = true;
      this.loadMouvement();
    }
  }

  loadData(): void {
    this.loiCadreService.getAll().subscribe({
      next: (data) => this.loisCadres = data,
      error: (err) => console.error('Erreur lors du chargement des lois cadres:', err)
    });

    this.posteService.getAll().subscribe({
      next: (data) => this.postes = data,
      error: (err) => console.error('Erreur lors du chargement des postes:', err)
    });
  }

  loadMouvement(): void {
    if (this.id) {
      this.mouvementService.getById(this.id).subscribe({
        next: (data) => {
          this.form.patchValue({
            type: data.type,
            posteConcerneId: data.posteConcerneId,
            dateEffet: data.dateEffet,
            description: data.description,
            loiCadreId: data.loiCadreId
          });
        },
        error: (err) => console.error('Erreur lors du chargement du mouvement:', err)
      });
    }
  }

  submit(): void {
  if (this.form.valid) {
    const mouvement: Mouvement = {
      id: this.id,
      type: this.form.value.type,
      posteConcerneId: this.form.value.posteConcerneId,
      dateEffet: this.form.value.dateEffet,
      description: this.form.value.description
    };

    const loiCadreId = this.form.value.loiCadreId;
    
    if (!loiCadreId && !this.isEditMode) {
      console.error('Loi Cadre ID is required for creating movements');
      return;
    }

    const operation = this.isEditMode
      ? this.mouvementService.update(this.id!, mouvement)
      : this.mouvementService.create(loiCadreId, mouvement);

    operation.subscribe({
      next: () => this.router.navigate(['/mouvements']),
      error: (err) => console.error('Erreur lors de l\'enregistrement:', err)
    });
  }
}
}
