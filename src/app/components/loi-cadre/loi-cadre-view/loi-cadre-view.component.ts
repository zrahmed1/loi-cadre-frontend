// src/app/components/loi-cadre/loi-cadre-view/loi-cadre-view.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { LoiCadre } from '../../../models/loi-cadre';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import {StatutLoiCadre} from '../../../models/loi-cadre';

@Component({
  selector: 'app-loi-cadre-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    RouterLink
  ],
  template: `
    <div class="container" *ngIf="loiCadre">
      <div class="header">
        <h2>Détails de la Loi Cadre {{loiCadre.annee}} - Version {{loiCadre.version}}</h2>
        <div class="header-actions">
          <button mat-raised-button color="primary" [routerLink]="['/loi-cadre/edit', loiCadre.id]"
                  [disabled]="loiCadre.statut === StatutLoiCadre.DEFINITIVE">">
            <mat-icon>edit</mat-icon>
            Modifier
          </button>
          <button mat-raised-button [routerLink]="['/lois-cadres']">
            <mat-icon>arrow_back</mat-icon>
            Retour
          </button>
        </div>
      </div>

      <mat-card class="info-card">
        <mat-card-header>
          <mat-card-title>Informations Générales</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="info-grid">
            <div class="info-item">
              <label>Exercice Budgétaire:</label>
              <span>{{loiCadre.annee}}</span>
            </div>
            <div class="info-item">
              <label>Version:</label>
              <span>{{loiCadre.version}}</span>
            </div>
            <div class="info-item">
              <label>Statut:</label>
              <span [ngClass]="getStatutClass(loiCadre.statut)">{{loiCadre.statut}}</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <mat-tab-group>
        <mat-tab label="Postes Budgétaires">
          <div class="tab-content">
            <table mat-table [dataSource]="loiCadre.postes || []" class="mat-elevation-z2">
              <ng-container matColumnDef="codePoste">
                <th mat-header-cell *matHeaderCellDef>Code Poste</th>
                <td mat-cell *matCellDef="let poste">{{poste.codePoste}}</td>
              </ng-container>
              <ng-container matColumnDef="effectifInitial">
                <th mat-header-cell *matHeaderCellDef>Effectif Initial</th>
                <td mat-cell *matCellDef="let poste">{{poste.effectifInitial}}</td>
              </ng-container>
              <ng-container matColumnDef="effectifFinal">
                <th mat-header-cell *matHeaderCellDef>Effectif Final</th>
                <td mat-cell *matCellDef="let poste">{{poste.effectifFinal}}</td>
              </ng-container>
              <ng-container matColumnDef="etat">
                <th mat-header-cell *matHeaderCellDef>État</th>
                <td mat-cell *matCellDef="let poste">{{poste.etat}}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="['codePoste', 'effectifInitial', 'effectifFinal', 'etat']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['codePoste', 'effectifInitial', 'effectifFinal', 'etat'];"></tr>
            </table>
          </div>
        </mat-tab>

        <mat-tab label="Mouvements">
          <div class="tab-content">
            <table mat-table [dataSource]="loiCadre.mouvements || []" class="mat-elevation-z2">
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Type</th>
                <td mat-cell *matCellDef="let mouvement">{{mouvement.type}}</td>
              </ng-container>
              <ng-container matColumnDef="dateEffet">
                <th mat-header-cell *matHeaderCellDef>Date d'Effet</th>
                <td mat-cell *matCellDef="let mouvement">{{mouvement.dateEffet | date:'shortDate'}}</td>
              </ng-container>
              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef>Description</th>
                <td mat-cell *matCellDef="let mouvement">{{mouvement.description}}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="['type', 'dateEffet', 'description']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['type', 'dateEffet', 'description'];"></tr>
            </table>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .header-actions {
      display: flex;
      gap: 12px;
    }

    .info-card {
      margin-bottom: 24px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-item label {
      font-weight: 500;
      color: #666;
    }

    .info-item span {
      font-size: 16px;
    }

    .tab-content {
      padding: 16px 0;
    }

    .status-initiale { color: #ff9800; }
    .status-envoyee-db { color: #2196f3; }
    .status-definitive { color: #4caf50; }
    .status-validee { color: #8bc34a; }
  `]
})
export class LoiCadreViewComponent implements OnInit {
  loiCadre?: LoiCadre;
  id!: number;

  StatutLoiCadre = StatutLoiCadre;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loiCadreService: LoiCadreService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.loadLoiCadre();
    }
  }

  loadLoiCadre(): void {
    this.loiCadreService.getById(this.id).subscribe({
      next: (data) => this.loiCadre = data,
      error: (err) => {
        console.error('Error loading loi cadre:', err);
        this.router.navigate(['/lois-cadres']);
      }
    });
  }

  getStatutClass(statut: StatutLoiCadre): string {
    return `status-${statut.toLowerCase().replace('_', '-')}`;
  }
}
