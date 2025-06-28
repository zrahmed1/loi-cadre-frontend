import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { PosteBudgetaireService } from '../../../services/poste-budgetaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PosteBudgetaire, EtatPoste } from '../../../models/poste-budgetaire';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poste-budgetaire-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink,CommonModule],
  templateUrl: './poste-budgetaire-form.component.html',
  styleUrls: ['./poste-budgetaire-form.component.scss']
})
export class PosteBudgetaireFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  etats = Object.values(EtatPoste);
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private posteService: PosteBudgetaireService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      codePoste: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}$/)]],
      etat: ['', Validators.required],
      effectifInitial: ['', [Validators.required, Validators.min(0)]],
      effectifFinal: ['', [Validators.required, Validators.min(0)]],
      etablissementId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.isEditMode = true;
      this.posteService.getById(this.id).subscribe({
        next: (data) => this.form.patchValue(data),
        error: (err) => console.error('Erreur lors du chargement du poste:', err)
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const poste: PosteBudgetaire = this.form.value;
      const operation = this.isEditMode
        ? this.posteService.update(this.id!, poste)
        : this.posteService.create(poste);
      operation.subscribe({
        next: () => this.router.navigate(['/postes']),
        error: (err) => console.error('Erreur lors de l\'enregistrement:', err)
      });
    }
  }
}
