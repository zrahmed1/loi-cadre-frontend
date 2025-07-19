
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ✅ nécessaire pour *ngFor, *ngIf
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../api.service';
import { EtablissementService } from '../etablissement.service';
import { Etablissement } from '../../models/etablissement';

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
    CommonModule, // ✅ obligatoire pour *ngFor
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
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Prénom</mat-label>
        <input matInput [(ngModel)]="data.prenom">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="data.email">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Mot de passe</mat-label>
        <input matInput type="password" [(ngModel)]="data.password">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Rôle</mat-label>
        <mat-select [(ngModel)]="data.role">
          <mat-option [value]="null">Tous les rôles</mat-option>
          <mat-option *ngFor="let role of roles" [value]="role">{{ role }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Établissement</mat-label>
        <mat-select [(ngModel)]="data.etablissementId">
          <mat-option [value]="null">Tous les établissements</mat-option>
          <mat-option *ngFor="let etab of etablissements" [value]="etab.id">{{ etab.nom }}
          </mat-option>
        </mat-select>

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

  roles: string[] = ['Administrateur', 'Responsable', 'Utilisateur'];
  etablissements: Etablissement[] = [];


  
  constructor(private apiService: ApiService,private etablissementService: EtablissementService) {
    this.etablissementService.getAll().subscribe(etabs => this.etablissements = etabs);
  }

  ngOnInit(): void {
    // ici tu pourras appeler l’API pour charger les établissements dynamiquement
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
       this.apiService.postData('/utilisateurs',this.data )
       .then(response => {
         console.log('Success:', response.data);
         alert('Form submitted successfully!');
       })
       .catch(error => {
         console.error('Error:', error);
         alert('Error submitting form');
       });

    this.dialogRef.close(this.data);
  }
}

