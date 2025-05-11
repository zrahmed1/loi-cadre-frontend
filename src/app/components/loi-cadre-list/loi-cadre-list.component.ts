import { Component, OnInit } from '@angular/core';
import {LoiCadre} from '../../models/loi-cadre.model';
import {LoiCadreService} from '../../services/loi-cadre.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-loi-cadre-list',
  templateUrl: './loi-cadre-list.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
})
export class LoiCadreListComponent implements OnInit {
  lois: LoiCadre[] = [];

  constructor(private loiCadreService: LoiCadreService) {}


  anneeFilter?: number;
  statutFilter?: string;
  etablissementFilter?: string;

  filteredLois: LoiCadre[] = [];

  ngOnInit(): void {
    this.loiCadreService.getAll().subscribe((data: LoiCadre[]) => {
      this.lois = data;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredLois = this.lois.filter((loi) => {
      const matchAnnee = !this.anneeFilter || loi.annee === this.anneeFilter;
      const matchStatut = !this.statutFilter || loi.statut === this.statutFilter;
      const matchEtab = !this.etablissementFilter || loi.postes?.some(p => p.etablissement?.nom.includes(this.etablissementFilter));
      return matchAnnee && matchStatut && matchEtab;
    });
  }

}
