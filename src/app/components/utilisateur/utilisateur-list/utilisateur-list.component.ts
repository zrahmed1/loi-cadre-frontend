import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="container">
      <h2>Gestion des Utilisateurs</h2>
      <button mat-raised-button color="primary" [routerLink]="['/utilisateur/create']">
        <mat-icon>add</mat-icon>
        Nouvel Utilisateur
      </button>
      
      <table mat-table [dataSource]="utilisateurs" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let user">{{ user.id }}</td>
        </ng-container>
        
        <ng-container matColumnDef="nom">
          <th mat-header-cell *matHeaderCellDef>Nom</th>
          <td mat-cell *matCellDef="let user">{{ user.nom }}</td>
        </ng-container>
        
        <ng-container matColumnDef="prenom">
          <th mat-header-cell *matHeaderCellDef>Prénom</th>
          <td mat-cell *matCellDef="let user">{{ user.prenom }}</td>
        </ng-container>
        
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let user">{{ user.email }}</td>
        </ng-container>
        
        <ng-container matColumnDef="role">
          <th mat-header-cell *matHeaderCellDef>Rôle</th>
          <td mat-cell *matCellDef="let user">{{ user.role }}</td>
        </ng-container>
        
        <ng-container matColumnDef="etablissement">
          <th mat-header-cell *matHeaderCellDef>Établissement</th>
          <td mat-cell *matCellDef="let user">{{ user.etablissement?.nom || 'Non assigné' }}</td>
        </ng-container>
        
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let user">
            <button mat-icon-button color="primary" [routerLink]="['/utilisateur/edit', user.id]" title="Modifier">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="delete(user.id!)" title="Supprimer">
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
      max-width: 1400px;
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
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'role', 'etablissement', 'actions'];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getAll().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Erreur lors du chargement des utilisateurs:', err)
    });
  }

  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.delete(id).subscribe({
        next: () => this.loadUtilisateurs(),
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }
}
