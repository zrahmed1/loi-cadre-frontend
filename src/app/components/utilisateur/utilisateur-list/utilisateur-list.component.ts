import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Etablissement } from '../../../models/etablissement';
import { Utilisateur, Role } from '../../../models/utilisateur';
import { EtablissementService } from '../../../services/etablissement.service';
import { UtilisateurService } from '../../../services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './utilisateur-list.component.html',
  styleUrls: ['./utilisateur-list.component.scss']
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  etablissements: Etablissement[] = [];
  filterForm: FormGroup;
  roles = Object.values(Role);

  constructor(
    private utilisateurService: UtilisateurService,
    private etablissementService: EtablissementService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      selectedRole: [null],
      selectedEtablissement: [null]
    });
  }

  ngOnInit() {
    this.loadUtilisateurs();
    this.etablissementService.getAll().subscribe(etabs => this.etablissements = etabs);
    this.filterForm.valueChanges.subscribe(() => this.loadUtilisateurs());
  }

  loadUtilisateurs() {
    const { selectedRole, selectedEtablissement } = this.filterForm.value;
    if (selectedRole) {
      this.utilisateurService.getByRole(selectedRole).subscribe(users => this.utilisateurs = users);
    } else if (selectedEtablissement) {
      this.utilisateurService.getByEtablissement(selectedEtablissement).subscribe(users => this.utilisateurs = users);
    } else {
      this.utilisateurService.getAll().subscribe(users => this.utilisateurs = users);
    }
  }

  delete(id: number) {
    this.utilisateurService.delete(id).subscribe(() => this.loadUtilisateurs());
  }
}