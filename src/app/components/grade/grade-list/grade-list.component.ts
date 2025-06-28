import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { GradeService } from '../../../services/grade.service';
import { Grade } from '../../../models/grade';

@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <div class="container">
      <h2>Gestion des Grades</h2>
      <button mat-raised-button color="primary" [routerLink]="['/grade/create']">
        <mat-icon>add</mat-icon>
        Nouveau Grade
      </button>
      
      <table mat-table [dataSource]="grades" class="mat-elevation-z8">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let grade">{{ grade.id }}</td>
        </ng-container>
        
        <ng-container matColumnDef="code">
          <th mat-header-cell *matHeaderCellDef>Code</th>
          <td mat-cell *matCellDef="let grade">{{ grade.code }}</td>
        </ng-container>
        
        <ng-container matColumnDef="libelle">
          <th mat-header-cell *matHeaderCellDef>Libellé</th>
          <td mat-cell *matCellDef="let grade">{{ grade.libelle }}</td>
        </ng-container>
        
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let grade">
            <button mat-icon-button color="primary" [routerLink]="['/grade/edit', grade.id]" title="Modifier">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="delete(grade.id!)" title="Supprimer">
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
export class GradeListComponent implements OnInit {
  grades: Grade[] = [];
  displayedColumns: string[] = ['id', 'code', 'libelle', 'actions'];

  constructor(private gradeService: GradeService) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.gradeService.getAll().subscribe({
      next: (data) => this.grades = data,
      error: (err) => console.error('Erreur lors du chargement des grades:', err)
    });
  }

  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce grade ?')) {
      this.gradeService.delete(id).subscribe({
        next: () => this.loadGrades(),
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }
}
