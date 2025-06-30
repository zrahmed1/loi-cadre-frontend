import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { LoiCadre } from '../../../models/loi-cadre';
import { Mouvement, TypeMouvement } from '../../../models/mouvement';
import { PosteBudgetaire } from '../../../models/poste-budgetaire';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { MouvementService } from '../../../services/mouvement.service';
import { PosteBudgetaireService } from '../../../services/poste-budgetaire.service';

@Component({
  selector: 'app-mouvement-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.scss']
})
export class MouvementListComponent implements OnInit {
  mouvements: Mouvement[] = [];
  lois: LoiCadre[] = [];
  postes: PosteBudgetaire[] = [];
  filterForm: FormGroup;
  types = Object.values(TypeMouvement);

  constructor(
    private mouvementService: MouvementService,
    private loiCadreService: LoiCadreService,
    private posteBudgetaireService: PosteBudgetaireService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      selectedLoiCadre: [null],
      selectedPoste: [null],
      selectedType: [null]
    });
  }

  ngOnInit() {
    this.loadMouvements();
    this.loiCadreService.getAll().subscribe(lois => this.lois = lois);
    this.posteBudgetaireService.getAll().subscribe(postes => this.postes = postes);
    this.filterForm.valueChanges.subscribe(() => this.loadMouvements());
  }

  loadMouvements() {
    const { selectedLoiCadre, selectedPoste, selectedType } = this.filterForm.value;
    if (selectedLoiCadre) {
      this.mouvementService.getByLoiCadre(selectedLoiCadre).subscribe(mouvs => this.mouvements = mouvs);
    } else if (selectedPoste) {
      this.mouvementService.getByPoste(selectedPoste).subscribe(mouvs => this.mouvements = mouvs);
    } else if (selectedType) {
      this.mouvementService.getByType(selectedType).subscribe(mouvs => this.mouvements = mouvs);
    } else {
      this.mouvementService.getAll().subscribe(mouvs => this.mouvements = mouvs);
    }
  }

  delete(id: number) {
    this.mouvementService.delete(id).subscribe(() => this.loadMouvements());
  }
}