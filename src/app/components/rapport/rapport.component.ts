import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { HttpClient } from "@angular/common/http";
import { jsPDF } from "jspdf";
import { LoiCadre } from "../../models/loi-cadre";
import { LoiCadreService } from "../../services/loi-cadre.service";

@Component({
  selector: "app-rapport",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: "./rapport.component.html",
  styleUrls: ["./rapport.component.scss"],
})
export class RapportComponent implements OnInit {
  lois: LoiCadre[] = [];
  displayedColumns: string[] = ["annee", "intitule", "statut", "actions"];
  filterForm: FormGroup;

  constructor(
    private loiCadreService: LoiCadreService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.filterForm = this.fb.group({
      selectedAnnee: [null],
    });
  }

  ngOnInit() {
    this.loadLois();
    this.filterForm.valueChanges.subscribe(() => this.loadLois());
  }

  loadLois() {
    const { selectedAnnee } = this.filterForm.value;
    this.loiCadreService.getAll().subscribe((lois) => {
      this.lois = lois.filter(
        (l) => !selectedAnnee || l.annee === Number(selectedAnnee)
      );
    });
  }

  exportPDF(loi: LoiCadre) {
    const doc = new jsPDF();
    doc.text(`Rapport de la Loi Cadre - ${loi.id}`, 10, 10);
    doc.text(`Année: ${loi.annee}`, 10, 20);
    doc.text(`Statut: ${loi.statut}`, 10, 30);
    // Ajouter ici plus de contenu si nécessaire
    doc.save(`rapport-${loi.id}.pdf`);
  }

  exportExcel(loi: LoiCadre) {
    this.http
      .get(`/loi-cadre/export/excel/${loi.id}`, {
        responseType: "blob",
      })
      .subscribe((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `rapport-total-${loi.id}.xlsx`;
        link.click();
      });
  }
}
