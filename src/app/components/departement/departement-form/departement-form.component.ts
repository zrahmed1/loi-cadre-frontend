import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from '../../../models/departement';
import { Utilisateur } from '../../../models/utilisateur';
import { DepartementService } from '../../../services/departement.service';
import { UtilisateurService } from '../../../services/utilisateur.service';

@Component({
  selector: 'app-departement-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './departement-form.component.html',
  styleUrls: ['./departement-form.component.scss']
})
export class DepartementFormComponent implements OnInit {
  departementForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  id: number | null = null;

  constructor(
    private departementService: DepartementService,
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.departementForm = this.fb.group({
      nom: ['', Validators.required],
      responsableId: [null]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.departementService.getById(this.id).subscribe(dep => this.departementForm.patchValue(dep));
    }
    this.utilisateurService.getAll().subscribe(users => this.utilisateurs = users);
  }

  save() {
    if (this.departementForm.valid) {
      const departement = this.departementForm.value as Departement;
      if (this.id) {
        this.departementService.update(this.id, departement).subscribe(() => this.router.navigate(['/departements']));
      } else {
        this.departementService.create(departement).subscribe(() => this.router.navigate(['/departements']));
      }
    }
  }
}