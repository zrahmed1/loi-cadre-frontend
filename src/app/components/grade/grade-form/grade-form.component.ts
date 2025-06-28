import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GradeService } from '../../../services/grade.service';
import { Grade } from '../../../models/grade';

@Component({
  selector: 'app-grade-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <div class="container">
      <h2>{{ isEditMode ? 'Modifier' : 'Créer' }} un Grade</h2>
      
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="fill">
          <mat-label>Code Grade</mat-label>
          <input matInput formControlName="code" placeholder="10 caractères max">
          <mat-error *ngIf="form.get('code')?.hasError('required')">Champ requis</mat-error>
          <mat-error *ngIf="form.get('code')?.hasError('maxlength')">Maximum 10 caractères</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="fill">
          <mat-label>Libellé</mat-label>
          <input matInput formControlName="libelle" placeholder="Nom du grade">
          <mat-error *ngIf="form.get('libelle')?.hasError('required')">Champ requis</mat-error>
        </mat-form-field>
        
        <div class="actions">
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            {{ isEditMode ? 'Modifier' : 'Créer' }}
          </button>
          <button mat-raised-button color="warn" type="button" [routerLink]="['/grades']">
            Annuler
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      max-width: 600px;
      margin: 0 auto;
    }
    h2 {
      color: #1976d2;
      margin-bottom: 24px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }
    .actions button {
      flex: 1;
    }
  `]
})
export class GradeFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private gradeService: GradeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(10)]],
      libelle: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.isEditMode = true;
      this.loadGrade();
    }
  }

  loadGrade(): void {
    if (this.id) {
      this.gradeService.getById(this.id).subscribe({
        next: (data) => this.form.patchValue(data),
        error: (err) => console.error('Erreur lors du chargement du grade:', err)
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const grade: Grade = {
        id: this.id,
        ...this.form.value
      };

      const operation = this.isEditMode
        ? this.gradeService.update(this.id!, grade)
        : this.gradeService.create(grade);

      operation.subscribe({
        next: () => this.router.navigate(['/grades']),
        error: (err) => console.error('Erreur lors de l\'enregistrement:', err)
      });
    }
  }
}
