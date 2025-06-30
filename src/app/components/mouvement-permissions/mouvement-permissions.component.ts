import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Etablissement } from '../../models/etablissement';
import { TypeMouvement } from '../../models/mouvement';
import { Utilisateur } from '../../models/utilisateur';
import { EtablissementService } from '../../services/etablissement.service';
import { UtilisateurService } from '../../services/utilisateur.service';

interface Permission {
  utilisateurId: number;
  etablissementId: number;
  mouvementType: TypeMouvement;
}

@Component({
  selector: 'app-mouvement-permissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mouvement-permissions.component.html',
  styleUrls: ['./mouvement-permissions.component.css']
})
export class MouvementPermissionsComponent implements OnInit {
  permissionsForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  etablissements: Etablissement[] = [];
  types = Object.values(TypeMouvement);

  constructor(
    private utilisateurService: UtilisateurService,
    private etablissementService: EtablissementService,
    private fb: FormBuilder
  ) {
    this.permissionsForm = this.fb.group({
      permissions: this.fb.array([])
    });
  }

  get permissions(): FormArray {
    return this.permissionsForm.get('permissions') as FormArray;
  }

  ngOnInit() {
    this.utilisateurService.getAll().subscribe(users => {
      this.utilisateurs = users;
      this.etablissementService.getAll().subscribe(etabs => {
        this.etablissements = etabs;
        // Mock permissions (replace with API call)
        this.addPermission({
          utilisateurId: users[0]?.id || 1,
          etablissementId: etabs[0]?.id || 1,
          mouvementType: TypeMouvement.CREATION
        });
      });
    });
  }

  addPermission(perm?: Permission) {
    const newPermission = this.fb.group({
      utilisateurId: [perm?.utilisateurId || this.utilisateurs[0]?.id || null, Validators.required],
      etablissementId: [perm?.etablissementId || this.etablissements[0]?.id || null, Validators.required],
      mouvementType: [perm?.mouvementType || TypeMouvement.CREATION, Validators.required]
    });
    this.permissions.push(newPermission);
  }

  removePermission(index: number) {
    this.permissions.removeAt(index);
  }

  save() {
    if (this.permissionsForm.valid) {
      console.log('Saving permissions:', this.permissions.value);
      // Call API to save permissions (custom endpoint, e.g., /api/mouvements/permissions)
    }
  }
}