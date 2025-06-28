import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <h1>Tableau de Bord - Gestion Loi Cadre</h1>

      <div class="cards-container">
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>Lois Cadres</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{stats.loisCadres}} lois cadres actives</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button [routerLink]="['/lois-cadres']">Gérer</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>Mouvements</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{stats.mouvements}} mouvements en attente</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button [routerLink]="['/mouvements']">Gérer</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>Signatures</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{stats.signatures}} signatures en attente</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button [routerLink]="['/signatures']">Gérer</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    .cards-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .dashboard-card {
      min-height: 200px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    loisCadres: 0,
    mouvements: 0,
    signatures: 0
  };

  ngOnInit(): void {
    // Load dashboard statistics
  }
}
