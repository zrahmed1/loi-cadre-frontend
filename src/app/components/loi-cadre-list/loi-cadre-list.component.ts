import { Component, OnInit } from '@angular/core';
import { LoiCadreService } from '../../core/services/loi-cadre.service';
import { LoiCadre } from '../../core/models/loi-cadre.model';

@Component({
  selector: 'app-loi-cadre-list',
  templateUrl: './loi-cadre-list.component.html',
})
export class LoiCadreListComponent implements OnInit {
  lois: LoiCadre[] = [];

  constructor(private loiCadreService: LoiCadreService) {}

  ngOnInit(): void {
    this.loiCadreService.getAll().subscribe(data => {
      this.lois = data;
    });
  }
  anneeFilter?: number;
  statutFilter?: string;
  etablissementFilter?: string;

  filteredLois: LoiCadre[] = [];

  ngOnInit(): void {
    this.loiCadreService.getAll().subscribe((data) => {
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
