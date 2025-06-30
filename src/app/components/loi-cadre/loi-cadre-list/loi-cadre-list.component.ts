import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { LoiCadre, StatutLoiCadre } from '../../../models/loi-cadre';
import { LoiCadreService } from '../../../services/loi-cadre.service';

@Component({
  selector: 'app-loi-cadre-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './loi-cadre-list.component.html',
  styleUrls: ['./loi-cadre-list.component.scss']
})
export class LoiCadreListComponent implements OnInit {
  lois: LoiCadre[] = [];
  filterForm: FormGroup;
  statuts = Object.values(StatutLoiCadre);
StatutLoiCadre: any;

  constructor(
    private loiCadreService: LoiCadreService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      selectedAnnee: [null],
      selectedStatut: [null]
    });
  }

  ngOnInit() {
    this.loadLois();
    this.filterForm.valueChanges.subscribe(() => this.loadLois());
  }

  loadLois() {
    const { selectedAnnee, selectedStatut } = this.filterForm.value;
    this.loiCadreService.getAll().subscribe(lois => {
      this.lois = lois.filter(l =>
        (!selectedAnnee || l.annee === selectedAnnee) &&
        (!selectedStatut || l.statut === selectedStatut)
      );
    });
  }

  changeStatut(id: number, statut: StatutLoiCadre) {
    this.loiCadreService.changerStatut(id, statut).subscribe(() => this.loadLois());
  }

  valider(id: number) {
    this.loiCadreService.valider(id).subscribe(() => this.loadLois());
  }

  delete(id: number) {
    this.loiCadreService.delete(id).subscribe(() => this.loadLois());
  }
}