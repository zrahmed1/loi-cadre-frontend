import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { EtablissementService } from '../../../services/etablissement.service';
import { Utilisateur, Role } from '../../../models/utilisateur';
import { Etablissement } from '../../../models/etablissement';

@Component({
  selector: 'app-utilisateur-form',
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
      <h2>{{ isEditMode ? 'Modifier' : 'Créer' }} un Utilisateur</h2>
      
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="form-row">
          <mat-form-field appearance="fill">
            <mat-label>Nom</mat-label>
            <input matInput formControlName="nom" placeholder="Nom de famille">
            <mat-error *ngIf="form.get('nom')?.hasError('required')">Champ requis</mat-error>
          </mat-form-field>
          
          <mat-form-field appearance="fill">
            <mat-label>Prénom</mat-label>
            <input matInput formControlName="prenom" placeholder="Prénom">
            <mat-error *ngIf="form.get('prenom')?.hasError('required')">Champ requis</mat-error>
          </mat-form-field>
        </div>
        
        <mat-form-field appearance="fill">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email" placeholder="email@example.com">
          <mat-error *ngIf="form.get('email')?.hasError('required')">Champ requis</mat-error>
          <mat-error *ngIf="form.get('email')?.hasError('email')">Format email invalide</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="fill" *ngIf="!isEditMode">
          <mat-label>Mot de passe</mat-label>
          <input matInput formControlName="motDePasse" type="password" placeholder="Mot de passe">
          <mat-error *ngIf="form.get('motDePasse')?.hasError('required')">Champ requis</mat-error>
          <mat-error *ngIf="form.get('motDePasse')?.hasError('minlength')">Minimum 6 caractères</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="fill">
          <mat-label>Rôle</mat-label>
          <mat-select formControlName="role">
            <mat-option *ngFor="let role of roles" [value]="role">
              {{ getRoleLabel(role) }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('role')?.hasError('required')">Champ requis</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="fill">
          <mat-label>Établissement</mat-label>
          <mat-select formControlName="etablissementId">
            <mat-option [value]="">Aucun établissement</mat-option>
            <mat-option *ngFor="let etab of etablissements" [value]="etab.id">
              {{ etab.nom }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        
        <div class="actions">
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            {{ isEditMode ? 'Modifier' : 'Créer' }}
          </button>
          <button mat-raised-button color="warn" type="button" [routerLink]="['/utilisateurs']">
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
    .form-row {
      display: flex;
      gap: 16px;
    }
    .form-row mat-form-field {
      flex: 1;
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
export class UtilisateurFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  roles = Object.values(Role);
  etablissements: Etablissement[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private utilisateurService: UtilisateurService,
    private etablissementService: EtablissementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      etablissementId: ['']
    });
  }

  ngOnInit(): void {
    this.loadEtablissements();
    
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.isEditMode = true;
      // Remove password requirement for edit mode
      this.form.get('motDePasse')?.clearValidators();
      this.form.get('motDePasse')?.updateValueAndValidity();
      this.loadUtilisateur();
    }
  }

  loadEtablissements(): void {
    this.etablissementService.getAll().subscribe({
      next: (data) => this.etablissements = data,
      error: (err) => console.error('Erreur lors du chargement des établissements:', err)
    });
  }

  loadUtilisateur(): void {
    if (this.id) {
      this.utilisateurService.getById(this.id).subscribe({
        next: (data) => {
          this.form.patchValue({
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
            role: data.role,
            etablissementId: data.etablissementId || ''
          });
        },
        error: (err) => console.error('Erreur lors du chargement de l\'utilisateur:', err)
      });
    }
  }

  getRoleLabel(role: Role): string {
    const labels: Record<Role, string> = {
      [Role.RESPONSABLE_RH]: 'Responsable RH',
      [Role.CADRE_RH]: 'Cadre RH',
      [Role.RS]: 'Responsable Structure',
      [Role.ADMIN]: 'Administrateur',
      [Role.CONSULTATION]: 'Consultation'
    };
    return labels[role] || role;
  }

  submit(): void {
    if (this.form.valid) {
      const utilisateur: Utilisateur = {
        id: this.id,
        nom: this.form.value.nom,
        prenom: this.form.value.prenom,
        email: this.form.value.email,
        role: this.form.value.role,
        etablissementId: this.form.value.etablissementId || undefined
      };

      // Only include password for new users
      if (!this.isEditMode && this.form.value.motDePasse) {
        utilisateur.motDePasse = this.form.value.motDePasse;
      }

      const operation = this.isEditMode
        ? this.utilisateurService.update(this.id!, utilisateur)
        : this.utilisateurService.create(utilisateur);

      operation.subscribe({
        next: () => this.router.navigate(['/utilisateurs']),
        error: (err) => console.error('Erreur lors de l\'enregistrement:', err)
      });
    }
  }
}
