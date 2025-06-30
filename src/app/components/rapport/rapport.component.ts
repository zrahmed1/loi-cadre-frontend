import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { LoiCadre } from '../../models/loi-cadre';
import { Mouvement } from '../../models/mouvement';
import { LoiCadreService } from '../../services/loi-cadre.service';
import { MouvementService } from '../../services/mouvement.service';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  rapportForm: FormGroup;
  lois: LoiCadre[] = [];
  mouvements: Mouvement[] = [];

  constructor(
    private loiCadreService: LoiCadreService,
    private mouvementService: MouvementService,
    private fb: FormBuilder
  ) {
    this.rapportForm = this.fb.group({
      selectedLoiCadre: [null],
      selectedAnnee: [new Date().getFullYear()]
    });
  }

  ngOnInit() {
    this.loiCadreService.getAll().subscribe(lois => this.lois = lois);
    this.rapportForm.valueChanges.subscribe(() => this.loadData());
  }

  loadData() {
    const { selectedLoiCadre, selectedAnnee } = this.rapportForm.value;
    if (selectedLoiCadre) {
      this.mouvementService.getByLoiCadre(selectedLoiCadre).subscribe(mouvs => this.mouvements = mouvs);
    } else {
      this.mouvementService.getAll().subscribe(mouvs => {
        this.mouvements = mouvs.filter(m => m.loiCadre?.annee === selectedAnnee);
      });
    }
  }

  exportPDF() {
    const doc = new jsPDF();
    doc.text(`Rapport - Année ${this.rapportForm.value.selectedAnnee}`, 10, 10);
    this.mouvements.forEach((m, i) => {
      doc.text(`${m.type}: ${m.description}`, 10, 20 + i * 10);
    });
    doc.save(`rapport-${this.rapportForm.value.selectedAnnee}.pdf`);
  }

  exportExcel() {
    const ws = XLSX.utils.json_to_sheet(this.mouvements);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Mouvements');
    XLSX.writeFile(wb, `rapport-${this.rapportForm.value.selectedAnnee}.xlsx`);
  }
}