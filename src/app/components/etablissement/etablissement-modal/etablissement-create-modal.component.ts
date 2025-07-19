import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EtablissementService } from '../../../services/etablissement.service';
import { Departement } from '../../../models/departement';
import { DepartementService } from '../../../services/departement.service';

@Component({
  selector: 'app-etablissement-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './etablissement-create-modal.component.html',
  styleUrls: ['./etablissement-create-modal.component.scss']
})
export class EtablissementCreateModalComponent {
  etablissementFormed: FormGroup;
  departements: Departement[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EtablissementCreateModalComponent>,
    private etablissementService: EtablissementService,
    private departementService: DepartementService,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.etablissementFormed = this.fb.group({
      nom: ['', Validators.required],
      departementId: [null, Validators.required]
    });
  }
  
  ngOnInit() {
    
    this.departementService.getAll().subscribe(depts => this.departements = depts);
  }

  onSubmit(): void {
    if (this.etablissementFormed.valid) {
      this.etablissementService.create(this.etablissementFormed.value).subscribe({
        next: () => this.dialogRef.close('refresh'),
        error: () => alert('Erreur lors de la création de l’établissement')
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
