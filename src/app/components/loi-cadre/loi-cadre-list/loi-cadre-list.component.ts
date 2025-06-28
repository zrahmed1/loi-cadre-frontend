
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { LoiCadre, StatutLoiCadre } from '../../../models/loi-cadre';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loi-cadre-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink,CommonModule],
  templateUrl: './loi-cadre-list.component.html',
  styleUrls: ['./loi-cadre-list.component.scss']
})
export class LoiCadreListComponent implements OnInit {
  loisCadres: LoiCadre[] = [];
  displayedColumns: string[] = ['id', 'exerciceBudgetaire', 'version', 'statut', 'actions'];

  constructor(private loiCadreService: LoiCadreService, private router: Router) {}

  ngOnInit(): void {
    this.loadLoisCadres();
  }

  loadLoisCadres(): void {
    this.loiCadreService.getAll().subscribe({
      next: (data) => {
        this.loisCadres = data.map(item => ({
          ...item,
          exerciceBudgetaire: item.annee // Map backend's annee to exerciceBudgetaire
        }));
      },
      error: (err) => console.error('Erreur lors du chargement des lois cadres:', err)
    });
  }

  edit(id: number): void {
    this.router.navigate(['/loi-cadre/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression de la loi cadre ?')) {
      this.loiCadreService.delete(id).subscribe({
        next: () => this.loadLoisCadres(),
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }

  valider(id: number): void {
    this.loiCadreService.valider(id).subscribe({
      next: () => this.loadLoisCadres(),
      error: (err) => console.error('Erreur lors de la validation:', err)
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/loi-cadre/view', id]);
  }
}