import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoiCadreService } from '../../core/services/loi-cadre.service';
import { LoiCadre } from '../../core/models/loi-cadre.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

exportExcel(): void {
  const wsData = this.getEtablissements().map(e => {
    const postes = this.getPostesByEtablissement(e.id);
    const initial = this.getTotalEffectif(postes, 'initial');
    const final = this.getTotalEffectif(postes, 'final');
    return {
      'Établissement': e.nom,
      'Effectif initial': initial,
      'Effectif final': final,
      'Écart': final - initial
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(wsData);
  const workbook = { Sheets: { 'Effectifs': worksheet }, SheetNames: ['Effectifs'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  FileSaver.saveAs(blob, `effectif_loi_${this.loi?.annee}_v${this.loi?.version}.xlsx`);
}

@Component({
  selector: 'app-effectif-consolide',
  templateUrl: './effectif-consolide.component.html',
})
export class EffectifConsolideComponent implements OnInit {
  loiId!: number;
  loi?: LoiCadre;

  constructor(
    private route: ActivatedRoute,
    private loiCadreService: LoiCadreService
  ) {}

  ngOnInit(): void {
    this.loiId = +this.route.snapshot.paramMap.get('id')!;
    this.loiCadreService.getById(this.loiId).subscribe((data) => {
      this.loi = data;
    });
  }

  getPostesByEtablissement(etabId: number): any[] {
    return this.loi?.postes?.filter((p) => p.etablissement?.id === etabId) || [];
  }

  getTotalEffectif(postes: any[], type: 'initial' | 'final'): number {
    return postes.reduce((total, p) => total + (type === 'initial' ? p.effectifInitial : p.effectifFinal), 0);
  }

  getEtablissements(): any[] {
    const unique = new Map<number, any>();
    this.loi?.postes?.forEach(p => {
      if (p.etablissement && !unique.has(p.etablissement.id)) {
        unique.set(p.etablissement.id, p.etablissement);
      }
    });
    return Array.from(unique.values());
  }
  exportPDF(): void {
    const doc = new jsPDF();
    const head = [['Établissement', 'Effectif initial', 'Effectif final', 'Écart']];
    const body = this.getEtablissements().map(e => {
      const postes = this.getPostesByEtablissement(e.id);
      const init = this.getTotalEffectif(postes, 'initial');
      const fin = this.getTotalEffectif(postes, 'final');
      return [e.nom, init, fin, fin - init];
    });

    autoTable(doc, {
      head,
      body,
      startY: 20,
      styles: { fontSize: 10 },
      theme: 'grid',
    });
    exportExcel(): void {
      const wsData = this.getEtablissements().map(e => {
        const postes = this.getPostesByEtablissement(e.id);
        const initial = this.getTotalEffectif(postes, 'initial');
        const final = this.getTotalEffectif(postes, 'final');
        return {
          'Établissement': e.nom,
          'Effectif initial': initial,
          'Effectif final': final,
          'Écart': final - initial
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(wsData);
      const workbook = { Sheets: { 'Effectifs': worksheet }, SheetNames: ['Effectifs'] };
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

      FileSaver.saveAs(blob, `effectif_loi_${this.loi?.annee}_v${this.loi?.version}.xlsx`);
    }


    doc.text(`Effectif consolidé — Loi ${this.loi?.annee} V${this.loi?.version}`, 10, 10);
    doc.save(`effectif_loi_${this.loi?.annee}_v${this.loi?.version}.pdf`);
  }

}
