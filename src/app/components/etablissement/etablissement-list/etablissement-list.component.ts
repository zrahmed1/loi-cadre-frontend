import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { EtablissementService } from '../../../services/etablissement.service';
import { Etablissement } from '../../../models/etablissement';

@Component({
  selector: 'app-etablissement-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    RouterLink
  ],
  templateUrl: './etablissement-list.component.html',
  styleUrl: './etablissement-list.component.scss'
})
export class EtablissementListComponent implements OnInit {
  etablissements: Etablissement[] = [];
  displayedColumns: string[] = ['nom', 'departement', 'actions'];

  constructor(private etablissementService: EtablissementService) {}

  ngOnInit(): void {
    this.loadEtablissements();
  }

  loadEtablissements(): void {
    this.etablissementService.getAll().subscribe({
      next: (data) => this.etablissements = data,
      error: (err) => console.error('Erreur lors du chargement des établissements:', err)
    });
  }

  deleteEtablissement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet établissement ?')) {
      this.etablissementService.delete(id).subscribe({
        next: () => this.loadEtablissements(),
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }
}