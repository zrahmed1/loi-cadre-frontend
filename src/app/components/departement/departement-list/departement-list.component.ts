import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DepartementService } from '../../../services/departement.service';
import { Departement } from '../../../models/departement';

@Component({
  selector: 'app-departement-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="container">
      <h2>Gestion des Départements</h2>
      <button mat-raised-button color="primary" [routerLink]="['/departement/create']">
        <mat-icon>add</mat-icon>
        Nouveau Département
      </button>
      
      <table mat-table [dataSource]="departements" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let dept">{{ dept.id }}</td>
        </ng-container>
        
        <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef>Nom</th>
          <td mat-cell *matCellDef="let dept">{{ dept.nom }}</td>
        </ng-container>
        
        <ng-container matColumnDef="responsable">
          <th mat-header-cell *matHeaderCellDef>Responsable</th>
          <td mat-cell *matCellDef="let dept">
            {{ dept.responsable ? (dept.responsable.prenom + ' ' + dept.responsable.nom) : 'Non assigné' }}
          </td>
        </ng-container>
        
        <ng-container matColumnDef="etablissements">
          <th mat-header-cell *matHeaderCellDef>Nb Établissements</th>
          <td mat-cell *matCellDef="let dept">{{ dept.etablissements?.length || 0 }}</td>
        </ng-container>
        
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let dept">
            <button mat-icon-button color="primary" [routerLink]="['/departement/edit', dept.id]" title="Modifier">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="delete(dept.id!)" title="Supprimer">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>
        
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h2 {
      color: #1976d2;
      margin-bottom: 24px;
    }
    table {
      width: 100%;
      margin-top: 16px;
    }
  `]
})
export class DepartementListComponent implements OnInit {
  departements: Departement[] = [];
  displayedColumns: string[] = ['id', 'nom', 'responsable', 'etablissements', 'actions'];

  constructor(private departementService: DepartementService) {}

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements(): void {
    this.departementService.getAll().subscribe({
      next: (data) => this.departements = data,
      error: (err) => console.error('Erreur lors du chargement des départements:', err)
    });
  }

  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) {
      this.departementService.delete(id).subscribe({
        next: () => this.loadDepartements(),
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }
}
