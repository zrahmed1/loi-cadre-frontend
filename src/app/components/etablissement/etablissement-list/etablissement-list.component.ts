import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Departement } from '../../../models/departement';
import { Etablissement } from '../../../models/etablissement';
import { DepartementService } from '../../../services/departement.service';
import { EtablissementService } from '../../../services/etablissement.service';

@Component({
  selector: 'app-etablissement-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './etablissement-list.component.html',
  styleUrls: ['./etablissement-list.component.scss']
})
export class EtablissementListComponent implements OnInit {
  etablissements: Etablissement[] = [];
  departements: Departement[] = [];
  filterForm: FormGroup;

  constructor(
    private etablissementService: EtablissementService,
    private departementService: DepartementService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      selectedDepartement: [null]
    });
  }

  ngOnInit() {
    this.loadEtablissements();
    this.departementService.getAll().subscribe(depts => this.departements = depts);
    this.filterForm.valueChanges.subscribe(() => this.loadEtablissements());
  }

  loadEtablissements() {
    const { selectedDepartement } = this.filterForm.value;
    this.etablissementService.getAll().subscribe(etabs => {
      this.etablissements = selectedDepartement
        ? etabs.filter(e => e.departementId === selectedDepartement)
        : etabs;
    });
  }

  delete(id: number) {
    this.etablissementService.delete(id).subscribe(() => this.loadEtablissements());
  }
}