import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SignatureService } from '../../../services/signature.service';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { SignatureElectronique } from '../../../models/signature-electronique';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signature-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, FormsModule, RouterLink,CommonModule],
  templateUrl: './signature-list.component.html',
  styleUrls: ['./signature-list.component.scss']
})
export class SignatureListComponent implements OnInit {
  signatures: SignatureElectronique[] = [];
  loisCadres: any[] = [];
  selectedLoiCadreId?: number;
  displayedColumns: string[] = ['id', 'loiCadreId', 'utilisateurId', 'estValide', 'dateSignature', 'actions'];

  constructor(
    private signatureService: SignatureService,
    private loiCadreService: LoiCadreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loiCadreService.getAll().subscribe({
      next: (data) => this.loisCadres = data,
      error: (err) => console.error('Erreur lors du chargement des lois cadres:', err)
    });
    this.loadSignatures();
  }

  loadSignatures(): void {
    const serviceCall = this.selectedLoiCadreId
      ? this.signatureService.getByLoiCadre(this.selectedLoiCadreId)
      : this.signatureService.getByUtilisateur(1);
    serviceCall.subscribe({
      next: (data) => this.signatures = data,
      error: (err) => console.error('Erreur lors du chargement des signatures:', err)
    });
  }

  filterByLoiCadre(): void {
    this.loadSignatures();
  }

  validate(id: number): void {
    this.signatureService.validate(id).subscribe({
      next: () => this.loadSignatures(),
      error: (err) => console.error('Erreur lors de la validation:', err)
    });
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression de la signature ?')) {
      this.signatureService.delete(id).subscribe({
        next: () => this.loadSignatures(),
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }
}