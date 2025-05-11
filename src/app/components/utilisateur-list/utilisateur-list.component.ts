import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../core/services/utilisateur.service';
import { Utilisateur } from '../../core/models/utilisateur.model';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.utilisateurService.getAll().subscribe((data) => {
      this.utilisateurs = data;
    });
  }

  delete(id: number): void {
    this.utilisateurService.delete(id).subscribe(() => this.ngOnInit());
  }
}
