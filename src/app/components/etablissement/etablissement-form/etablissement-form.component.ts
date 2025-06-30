import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from '../../../models/departement';
import { Etablissement } from '../../../models/etablissement';
import { DepartementService } from '../../../services/departement.service';
import { EtablissementService } from '../../../services/etablissement.service';

@Component({
  selector: 'app-etablissement-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './etablissement-form.component.html',
  styleUrls: ['./etablissement-form.component.scss']
})
export class EtablissementFormComponent implements OnInit {
  etablissementForm: FormGroup;
  departements: Departement[] = [];
  id: number | null = null;

  constructor(
    private etablissementService: EtablissementService,
    private departementService: DepartementService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.etablissementForm = this.fb.group({
      nom: ['', Validators.required],
      departementId: [null]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.etablissementService.getById(this.id).subscribe(etab => this.etablissementForm.patchValue(etab));
    }
    this.departementService.getAll().subscribe(depts => this.departements = depts);
  }

  save() {
    if (this.etablissementForm.valid) {
      const etablissement = this.etablissementForm.value as Etablissement;
      if (this.id) {
        this.etablissementService.update(this.id, etablissement).subscribe(() => this.router.navigate(['/etablissements']));
      } else {
        this.etablissementService.create(etablissement).subscribe(() => this.router.navigate(['/etablissements']));
      }
    }
  }
}