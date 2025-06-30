import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Etablissement } from '../../../models/etablissement';
import { Role, Utilisateur } from '../../../models/utilisateur';
import { EtablissementService } from '../../../services/etablissement.service';
import { UtilisateurService } from '../../../services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.scss']
})
export class UtilisateurFormComponent implements OnInit {
  utilisateurForm: FormGroup;
  etablissements: Etablissement[] = [];
  roles = Object.values(Role);
  id: number | null = null;

  constructor(
    private utilisateurService: UtilisateurService,
    private etablissementService: EtablissementService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.utilisateurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: [''],
      role: [Role.CONSULTATION, Validators.required],
      etablissementId: [null]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.utilisateurService.getById(this.id).subscribe(user => this.utilisateurForm.patchValue(user));
      this.utilisateurForm.get('motDePasse')?.clearValidators();
    } else {
      this.utilisateurForm.get('motDePasse')?.setValidators(Validators.required);
    }
    this.utilisateurForm.get('motDePasse')?.updateValueAndValidity();
    this.etablissementService.getAll().subscribe(etabs => this.etablissements = etabs);
  }

  save() {
    if (this.utilisateurForm.valid) {
      const utilisateur = this.utilisateurForm.value as Utilisateur;
      if (this.id) {
        this.utilisateurService.update(this.id, utilisateur).subscribe(() => this.router.navigate(['/utilisateurs']));
      } else {
        this.utilisateurService.create(utilisateur).subscribe(() => this.router.navigate(['/utilisateurs']));
      }
    }
  }
}