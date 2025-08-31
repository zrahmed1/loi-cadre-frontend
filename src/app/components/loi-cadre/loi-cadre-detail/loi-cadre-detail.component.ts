import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { LoiCadre, StatutLoiCadre } from '../../../models/loi-cadre';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { SignatureService } from '../../../services/signature.service';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-loi-cadre-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './loi-cadre-detail.component.html',
  styleUrls: ['./loi-cadre-detail.component.css']
})
export class LoiCadreDetailComponent implements OnInit {
  loiCadre: LoiCadre | null = null;
  statuts = Object.values(StatutLoiCadre);

  constructor(
    private loiCadreService: LoiCadreService,
    private signatureService: SignatureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loiCadreService.getById(id).subscribe(loi => this.loiCadre = loi);
  }

  changeStatut(statut: StatutLoiCadre) {
    this.loiCadreService.changerStatut(this.loiCadre!.id!, statut).subscribe(() => this.ngOnInit());
  }

  valider() {
    this.loiCadreService.valider(this.loiCadre!.id!).subscribe(() => this.ngOnInit());
  }

  signer() {
    const signatureRequest = {
      loiCadreId: this.loiCadre!.id!,
      signataireId: 1, // This should be the current user's ID
      status: 'EN_ATTENTE' as any // You might need to import StatutSignature
    };
    this.signatureService.create(signatureRequest).subscribe(() => this.ngOnInit());
  }

  exportPDF() {
    const doc = new jsPDF();
    doc.text(`Loi Cadre ${this.loiCadre?.annee} - Version ${this.loiCadre?.version}`, 10, 10);
    doc.save(`loi-cadre-${this.loiCadre?.id}.pdf`);
  }

  exportExcel() {
    const ws = XLSX.utils.json_to_sheet(this.loiCadre?.postes || []);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Postes');
    XLSX.writeFile(wb, `loi-cadre-${this.loiCadre?.id}.xlsx`);
  }
}