
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoiCadre, StatutLoiCadre } from '../../../models/loi-cadre';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loi-cadre-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink,CommonModule],
  templateUrl: './loi-cadre-form.component.html',
  styleUrls: ['./loi-cadre-form.component.scss']
})
export class LoiCadreFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  statuts = Object.values(StatutLoiCadre);
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private loiCadreService: LoiCadreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      annee: ['', [Validators.required, Validators.min(2000), Validators.max(2100)]], // Changed from exerciceBudgetaire
      version: [1, [Validators.required, Validators.min(1)]],
      statut: [StatutLoiCadre.INITIALE, Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.isEditMode = true;
      this.loiCadreService.getById(this.id).subscribe({
        next: (data) => this.form.patchValue({
          annee: data.annee, // Use backend field name
          version: data.version,
          statut: data.statut
        }),
        error: (err) => console.error('Erreur lors du chargement de la loi cadre:', err)
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const loi: LoiCadre = {
        id: this.id,
        annee: this.form.value.annee, // Use backend field name
        version: this.form.value.version,
        statut: this.form.value.statut
      };
      const operation = this.isEditMode
        ? this.loiCadreService.update(this.id!, loi)
        : this.loiCadreService.create(loi);
      operation.subscribe({
        next: () => this.router.navigate(['/lois-cadres']),
        error: (err) => console.error('Erreur lors de l\'enregistrement:', err)
      });
    }
  }
}
