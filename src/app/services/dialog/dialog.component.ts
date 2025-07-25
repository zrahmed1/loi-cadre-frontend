import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../api.service';
import { EtablissementService } from '../etablissement.service';
import { Etablissement } from '../../models/etablissement';
import { z } from 'zod';

const userSchema = z.object({
  nom: z.string().min(1, 'Le nom est requis'),
  prenom: z.string().min(1, 'Le prénom est requis'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
  role: z.string().min(1, 'Rôle requis'),
  etablissementId: z.number().min(1, 'Établissement requis'),
});

interface DialogData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: string | null;
  etablissementId: number | null;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  template: `
    <h2 mat-dialog-title>Formulaire Utilisateur</h2>

    <mat-dialog-content>
      <mat-form-field appearance="outline">
        <mat-label>Nom</mat-label>
        <input matInput [(ngModel)]="data.nom">
        <mat-error *ngIf="errors['nom']">{{ errors['nom'] }}</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Prénom</mat-label>
        <input matInput [(ngModel)]="data.prenom">
        <mat-error *ngIf="errors['prenom']">{{ errors['prenom'] }}</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="data.email">
        <mat-error *ngIf="errors['email']">{{ errors['email'] }}</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Mot de passe</mat-label>
        <input matInput type="password" [(ngModel)]="data.password">
        <mat-error *ngIf="errors['password']">{{ errors['password'] }}</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Rôle</mat-label>
        <mat-select [(ngModel)]="data.role">
          <mat-option [value]="null">Sélectionner un rôle</mat-option>
          <mat-option *ngFor="let role of roles" [value]="role">{{ role }}</mat-option>
        </mat-select>
        <mat-error *ngIf="errors['role']">{{ errors['role'] }}</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Établissement</mat-label>
        <mat-select [(ngModel)]="data.etablissementId">
          <mat-option [value]="null">Sélectionner un établissement</mat-option>
          <mat-option *ngFor="let etab of etablissements" [value]="etab.id">{{ etab.nom }}</mat-option>
        </mat-select>
        <mat-error *ngIf="errors['etablissementId']">{{ errors['etablissementId'] }}</mat-error>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-button color="primary" (click)="onSave()">Enregistrer</button>
    </mat-dialog-actions>
  `,
  styles: `
    mat-form-field {
      display: block;
      width: 100%;
      margin-bottom: 10px;
    }
  `
})
export class DialogComponent {
  dialogRef = inject(MatDialogRef<DialogComponent>);
  data: DialogData = inject(MAT_DIALOG_DATA);
  cdr = inject(ChangeDetectorRef);

  roles: string[] = ['ADMIN', 'RESPONSABLE_RH', 'CADRE_RH', 'RS', 'CONSULTATION '];
  etablissements: Etablissement[] = [];
  errors: Record<string, string> = {};

  constructor(
    private apiService: ApiService,
    private etablissementService: EtablissementService
  ) {
    this.etablissementService.getAll().subscribe(etabs => this.etablissements = etabs);
  }

  validate(): boolean {
    this.errors = {}; 
    const result = userSchema.safeParse(this.data);
    console.log(result);
    
    if (!result.success) {
      result.error.issues.forEach((err: z.ZodIssue) => {
        const field = err.path[0] as string;
        this.errors[field] = err.message;
      });
      this.cdr.detectChanges(); // ✅ Force UI update
      return false;
    }
    console.log(this.errors)
    return true;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.validate()) {      
      alert('Veuillez corriger les erreurs avant de soumettre.');
      return;
    }

    this.apiService.postData('/utilisateurs', this.data)
      .then(response => {
        console.log('Success:', response.data);
        alert('Formulaire soumis avec succès');
        this.dialogRef.close(this.data);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Erreur lors de la soumission');
      });
  }
}
