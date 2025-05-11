import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../../models/utilisateur.model';
import {UtilisateurService} from '../../services/utilisateur.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.utilisateurService.getAll().subscribe((data: Utilisateur[]) => {
      this.utilisateurs = data;
    });
  }

  delete(id: number): void {
    this.utilisateurService.delete(id).subscribe(() => this.ngOnInit());
  }
}
