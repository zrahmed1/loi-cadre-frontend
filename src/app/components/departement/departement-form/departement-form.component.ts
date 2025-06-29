import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DepartementService } from '../../../services/departement.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Departement } from '../../../models/departement';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-departement-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink
  ],
  template: `
    <div class="container">
      <h2>{{ isEditMode ? 'Modifier' : 'Créer' }} un Département</h2>
      
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="fill">
          <mat-label>Nom du Département</mat-label>
          <input matInput formControlName="nom" placeholder="Nom du département">
          <mat-error *ngIf="form.get('nom')?.hasError('required')">Champ requis</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="fill">
  <mat-label>Responsable (Optionnel)</mat-label>
  <mat-select formControlName="responsableId">
    <mat-option [value]="">Aucun responsable pour le moment</mat-option>
    <mat-option *ngFor="let user of utilisateurs" [value]="user.id">
      {{ user.prenom }} {{ user.nom }} ({{ user.role }})
    </mat-option>
  </mat-select>
  <mat-hint>Vous pourrez assigner un responsable plus tard</mat-hint>
</mat-form-field>
        
        <div class="actions">
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            {{ isEditMode ? 'Modifier' : 'Créer' }}
          </button>
          <button mat-raised-button color="warn" type="button" [routerLink]="['/departements']">
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
export class DepartementFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  utilisateurs: Utilisateur[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private departementService: DepartementService,
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      responsableId: ['']
    });
  }

  ngOnInit(): void {
    this.loadUtilisateurs();
    
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.isEditMode = true;
      this.loadDepartement();
    }
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getAll().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Erreur lors du chargement des utilisateurs:', err)
    });
  }

  loadDepartement(): void {
    if (this.id) {
      this.departementService.getById(this.id).subscribe({
        next: (data) => {
          this.form.patchValue({
            nom: data.nom,
            responsableId: data.responsableId || ''
          });
        },
        error: (err) => console.error('Erreur lors du chargement du département:', err)
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const departement: Departement = {
        id: this.id,
        nom: this.form.value.nom,
        // Fix: Pass the responsableId as a number, not as an object
        responsableId: this.form.value.responsableId || undefined
      };

      const operation = this.isEditMode
        ? this.departementService.update(this.id!, departement)
        : this.departementService.create(departement);

      operation.subscribe({
        next: () => this.router.navigate(['/departements']),
        error: (err) => console.error('Erreur lors de l\'enregistrement:', err)
      });
    }
  }
}
