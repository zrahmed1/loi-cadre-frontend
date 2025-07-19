import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DepartementService } from '../../../services/departement.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { Departement } from '../../../models/departement';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-departement-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './departement-create-modal.component.html',
  styleUrls: ['./departement-create-modal.component.scss']
})
export class DepartementCreateModalComponent implements OnInit {
  departementForm: FormGroup;
  utilisateurs: Utilisateur[] = [];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DepartementCreateModalComponent>,
    private departementService: DepartementService,
    private utilisateurService: UtilisateurService,
    @Inject(MAT_DIALOG_DATA) public data: Departement
  ) {
    this.departementForm = this.fb.group({
      nom: ['', Validators.required],
      responsableId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.utilisateurService.getAll().subscribe(users => this.utilisateurs = users);
  
    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.departementForm.patchValue({
        nom: this.data.nom,
        responsableId: this.data.responsableId
      });
    }
  }
  
  onSubmit(): void {
    if (this.departementForm.invalid) return;

    const payload = this.departementForm.value;

    if (this.isEditMode) {
      this.departementService.update(this.data.id!, payload).subscribe({
        next: () => this.dialogRef.close('refresh'),
        error: () => alert('Erreur lors de la modification du département')
      });
    } else {
      this.departementService.create(payload).subscribe({
        next: () => this.dialogRef.close('refresh'),
        error: () => alert('Erreur lors de la création du département')
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
