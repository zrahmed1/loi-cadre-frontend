import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EtablissementService } from '../../../services/etablissement.service';
import { DepartementService } from '../../../services/departement.service';
import { Etablissement } from '../../../models/etablissement';
import { Departement } from '../../../models/departement';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-etablissement-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    MatIcon
  ],
  templateUrl: './etablissement-form.component.html',
  styleUrl: './etablissement-form.component.scss'
})
export class EtablissementFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  departements: Departement[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private etablissementService: EtablissementService,
    private departementService: DepartementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      departementId: ['']
    });
  }

  ngOnInit(): void {
    this.loadDepartements();
    
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEditMode = true;
      this.loadEtablissement();
    }
  }

  loadDepartements(): void {
    this.departementService.getAll().subscribe({
      next: (data) => this.departements = data,
      error: (err) => console.error('Erreur lors du chargement des départements:', err)
    });
  }

  loadEtablissement(): void {
    if (this.id) {
      this.etablissementService.getById(this.id).subscribe({
        next: (data) => this.form.patchValue(data),
        error: (err) => console.error('Erreur lors du chargement de l\'établissement:', err)
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      const etablissement: Etablissement = this.form.value;
      
      const operation = this.isEditMode
        ? this.etablissementService.update(this.id!, etablissement)
        : this.etablissementService.create(etablissement);

      operation.subscribe({
        next: () => this.router.navigate(['/etablissements']),
        error: (err) => console.error('Erreur lors de la sauvegarde:', err)
      });
    }
  }
}