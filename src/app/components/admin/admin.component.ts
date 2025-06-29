// src/app/components/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { LoiCadreService } from '../../services/loi-cadre.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { DepartementService } from '../../services/departement.service';
import { PosteBudgetaireService } from '../../services/poste-budgetaire.service';
import { EtablissementService } from '../../services/etablissement.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    RouterLink
  ],
  template: `
    <div class="container">
      <h1>Administration</h1>
      <p>Gérez tous les aspects de votre système de lois cadres</p>
      
      <!-- Statistics Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>description</mat-icon>
            <mat-card-title>{{ totalLoisCadres }}</mat-card-title>
            <mat-card-subtitle>Lois Cadres</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-button [routerLink]="['/lois-cadres']">Voir tout</button>
          </mat-card-actions>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>people</mat-icon>
            <mat-card-title>{{ totalUtilisateurs }}</mat-card-title>
            <mat-card-subtitle>Utilisateurs</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-button [routerLink]="['/utilisateurs']">Gérer</button>
          </mat-card-actions>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>business</mat-icon>
            <mat-card-title>{{ totalDepartements }}</mat-card-title>
            <mat-card-subtitle>Départements</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-button [routerLink]="['/departements']">Gérer</button>
          </mat-card-actions>
        </mat-card>
        
        <mat-card class="stat-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>work</mat-icon>
            <mat-card-title>{{ totalPostes }}</mat-card-title>
            <mat-card-subtitle>Postes Budgétaires</mat-card-subtitle>
          </mat-card-header>
          <mat-card-actions>
            <button mat-button [routerLink]="['/postes']">Voir tout</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="stat-card">
  <mat-card-header>
    <mat-icon mat-card-avatar>location_city</mat-icon>
    <mat-card-title>{{ totalEtablissements }}</mat-card-title>
    <mat-card-subtitle>Établissements</mat-card-subtitle>
  </mat-card-header>
  <mat-card-actions>
    <button mat-button [routerLink]="['/etablissements']">Gérer</button>
  </mat-card-actions>
</mat-card>
      </div>
      
      <!-- Management Cards -->
      <h2>Gestion du Système</h2>
      <div class="management-grid">
        <mat-card class="management-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">people</mat-icon>
            <mat-card-title>Gestion des Utilisateurs</mat-card-title>
            <mat-card-subtitle>Créer, modifier et supprimer des utilisateurs</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Gérez les comptes utilisateurs, leurs rôles et permissions.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" [routerLink]="['/utilisateurs']">
              <mat-icon>people</mat-icon>
              Gérer les Utilisateurs
            </button>
            <button mat-button [routerLink]="['/utilisateur/create']">
              <mat-icon>person_add</mat-icon>
              Nouvel Utilisateur
            </button>
          </mat-card-actions>
        </mat-card>
        
        <mat-card class="management-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="accent">business</mat-icon>
            <mat-card-title>Gestion des Départements</mat-card-title>
            <mat-card-subtitle>Organiser la structure organisationnelle</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Créez et gérez les départements et leurs responsables.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="accent" [routerLink]="['/departements']">
              <mat-icon>business</mat-icon>
              Gérer les Départements
            </button>
            <button mat-button [routerLink]="['/departement/create']">
              <mat-icon>add_business</mat-icon>
              Nouveau Département
            </button>
          </mat-card-actions>
        </mat-card>
        
        <mat-card class="management-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="warn">military_tech</mat-icon>
            <mat-card-title>Gestion des Grades</mat-card-title>
            <mat-card-subtitle>Définir les grades et classifications</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Créez et gérez les grades utilisés dans les postes budgétaires.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="warn" [routerLink]="['/grades']">
              <mat-icon>military_tech</mat-icon>
              Gérer les Grades
            </button>
            <button mat-button [routerLink]="['/grade/create']">
              <mat-icon>add</mat-icon>
              Nouveau Grade
            </button>
          </mat-card-actions>
        </mat-card>
        
        <mat-card class="management-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>location_city</mat-icon>
            <mat-card-title>Gestion des Établissements</mat-card-title>
            <mat-card-subtitle>Organiser les établissements</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Gérez les établissements et leurs affectations.</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button [routerLink]="['/etablissements']">
              <mat-icon>location_city</mat-icon>
              Gérer les Établissements
            </button>
            <button mat-button [routerLink]="['/etablissement/create']">
              <mat-icon>add_location</mat-icon>
              Nouvel Établissement
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      color: #1976d2;
      margin-bottom: 8px;
    }
    
    h2 {
      color: #424242;
      margin: 32px 0 16px 0;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 24px 0;
    }
    
    .stat-card {
      text-align: center;
    }
    
    .stat-card mat-card-title {
      font-size: 2rem;
      font-weight: bold;
      color: #1976d2;
    }
    
    .management-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }
    
    .management-card {
      height: 100%;
    }
    
    .management-card mat-card-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .management-card mat-card-actions button {
      justify-content: flex-start;
    }
  `]
})
export class AdminComponent implements OnInit {
  totalLoisCadres = 0;
  totalUtilisateurs = 0;
  totalDepartements = 0;
  totalPostes = 0;

  constructor(
    private loiCadreService: LoiCadreService,
  private utilisateurService: UtilisateurService,
  private departementService: DepartementService,
  private posteService: PosteBudgetaireService,
  private etablissementService: EtablissementService
  ) {}
  totalEtablissements = 0;

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.loiCadreService.getAll().subscribe({
      next: (data) => this.totalLoisCadres = data.length,
      error: (err) => console.error('Erreur lors du chargement des lois cadres:', err)
    });

    this.utilisateurService.getAll().subscribe({
      next: (data) => this.totalUtilisateurs = data.length,
      error: (err) => console.error('Erreur lors du chargement des utilisateurs:', err)
    });

    this.departementService.getAll().subscribe({
      next: (data) => this.totalDepartements = data.length,
      error: (err) => console.error('Erreur lors du chargement des départements:', err)
    });

    this.etablissementService.getAll().subscribe({
      next: (data) => this.totalEtablissements = data.length,
      error: (err) => console.error('Erreur lors du chargement des établissements:', err)
    });
  }
}
