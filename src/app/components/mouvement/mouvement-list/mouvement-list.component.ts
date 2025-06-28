
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Added for error handling
import { MouvementService } from '../../../services/mouvement.service';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { Mouvement } from '../../../models/mouvement';
import { LoiCadre } from '../../../models/loi-cadre';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mouvement-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, FormsModule, RouterLink, CommonModule, MatSnackBarModule],
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.scss']
})
export class MouvementListComponent implements OnInit {
  mouvements: Mouvement[] = [];
  loisCadres: LoiCadre[] = [];
  selectedLoiCadreId?: number;
  displayedColumns: string[] = ['id', 'type', 'effectifConcerne', 'dateEffet', 'loiCadreId', 'actions'];

  constructor(
    private mouvementService: MouvementService,
    private loiCadreService: LoiCadreService,
    private router: Router,
    private snackBar: MatSnackBar // Added for error handling
  ) {}

  ngOnInit(): void {
    this.loiCadreService.getAll().subscribe({
      next: (data) => this.loisCadres = data,
      error: (err) => {
        console.error('Erreur lors du chargement des lois cadres:', err);
        this.snackBar.open('Erreur lors du chargement des lois cadres', 'Fermer', { duration: 3000 });
      }
    });
    this.loadMouvements();
  }

  loadMouvements(): void {
    const serviceCall = this.selectedLoiCadreId
      ? this.mouvementService.getByLoiCadre(this.selectedLoiCadreId)
      : this.mouvementService.getAll();
    serviceCall.subscribe({
      next: (data) => this.mouvements = data,
      error: (err) => {
        console.error('Erreur lors du chargement des mouvements:', err);
        let errorMessage = 'Erreur lors du chargement des mouvements';
        if (err.status === 404) {
          errorMessage = 'Ressource non trouvée. Vérifiez que la loi cadre existe.';
        }
        this.snackBar.open(errorMessage, 'Fermer', { duration: 3000 });
      }
    });
  }

  filterByLoiCadre(): void {
    this.loadMouvements();
  }

  edit(id: number): void {
    this.router.navigate(['/mouvement/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression du mouvement ?')) {
      this.mouvementService.delete(id).subscribe({
        next: () => this.loadMouvements(),
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          this.snackBar.open('Erreur lors de la suppression du mouvement', 'Fermer', { duration: 3000 });
        }
      });
    }
  }
}