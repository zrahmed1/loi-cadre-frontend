import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PosteBudgetaireService } from '../../../services/poste-budgetaire.service';
import { PosteBudgetaire } from '../../../models/poste-budgetaire';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poste-budgetaire-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, RouterLink,CommonModule],
  templateUrl: './poste-budgetaire-list.component.html',
  styleUrls: ['./poste-budgetaire-list.component.scss']
})
export class PosteBudgetaireListComponent implements OnInit {
  postes: PosteBudgetaire[] = [];
  selectedEtablissementId?: number;
  displayedColumns: string[] = ['id', 'codePoste', 'etat', 'effectifInitial', 'effectifFinal', 'etablissementId', 'actions'];

  constructor(private posteService: PosteBudgetaireService, private router: Router) {}

  ngOnInit(): void {
    this.loadPostes();
  }

  loadPostes(): void {
    const serviceCall = this.selectedEtablissementId
      ? this.posteService.getByEtablissement(this.selectedEtablissementId)
      : this.posteService.getAll();
    serviceCall.subscribe({
      next: (data) => this.postes = data,
      error: (err) => console.error('Erreur lors du chargement des postes:', err)
    });
  }

  filterByEtablissement(): void {
    this.loadPostes();
  }

  edit(id: number): void {
    this.router.navigate(['/poste/edit', id]);
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression du poste ?')) {
      this.posteService.delete(id).subscribe({
        next: () => this.loadPostes(),
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }
}
