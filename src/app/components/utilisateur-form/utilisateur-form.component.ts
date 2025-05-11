import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../../core/models/utilisateur.model';
import { UtilisateurService } from '../../core/services/utilisateur.service';
import { EtablissementService } from '../../core/services/etablissement.service';
import { Etablissement } from '../../core/models/etablissement.model';

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
})
export class UtilisateurFormComponent implements OnInit {
  user: Utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    role: 'RESPONSABLE_RH',
  };

  editMode = false;
  etablissements: Etablissement[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utilisateurService: UtilisateurService,
    private etablissementService: EtablissementService
  ) {}

  ngOnInit(): void {
  localStorage.setItem('role', 'ADMIN'); // ou RS, RESPONSABLE_RH, etc.

    const id = this.route.snapshot.paramMap.get('id');
    this.etablissementService.getAll().subscribe((data) => (this.etablissements = data));

    if (id) {
      this.editMode = true;
      this.utilisateurService.getById(+id).subscribe((data) => {
        this.user = data;
      });
    }
  }

  onSubmit(): void {
    if (this.editMode && this.user.id) {
      this.utilisateurService.update(this.user.id, this.user).subscribe(() => {
        this.router.navigate(['/utilisateur']);
      });
    } else {
      this.utilisateurService.create(this.user).subscribe(() => {
        this.router.navigate(['/utilisateur']);
      });
    }
  }
}
