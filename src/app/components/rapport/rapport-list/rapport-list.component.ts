import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";
import { LoiCadre } from "../../../models/loi-cadre";
import { LoiCadreService } from "../../../services/loi-cadre.service";

@Component({
  selector: "app-rapport-list",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./rapport-list.component.html",
  styleUrls: ["./rapport-list.component.scss"],
})
export class RapportListComponent implements OnInit {
  loisCadres: LoiCadre[] = [];
  displayedColumns: string[] = [
    "annee",
    "version",
    "statut",
    "dateCreation",
    "dateModification",
    "postes",
    "mouvements",
    "actions",
  ];
  isLoading: boolean = false;

  constructor(
    private loiCadreService: LoiCadreService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLoisCadres();
  }

  loadLoisCadres(): void {
    this.isLoading = true;
    this.loiCadreService.getAll().subscribe({
      next: (loisCadres) => {
        this.loisCadres = loisCadres;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open(
          "Error loading loi cadres: " + err.message,
          "Close",
          { duration: 3000 }
        );
        this.isLoading = false;
      },
    });
  }

  async exportRapport(loiCadreId: number): Promise<void> {
    const assetPath = `/assets/exports/loi-cadre-${loiCadreId}.xlsx`;
    try {
      const response = await fetch(assetPath, { method: 'GET' });
      if (response.ok) {
        const blob = await response.blob();
        if (!blob) throw new Error('Asset blob is empty');
        const url = window.URL.createObjectURL(blob as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `loi-cadre-${loiCadreId}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.snackBar.open('Rapport downloaded from assets', 'Close', { duration: 2000 });
        return;
      }

      // Not available in assets -> fall back to backend
      const backendBlob = await this.loiCadreService.exportExcel(loiCadreId).toPromise();
      if (!backendBlob) throw new Error('Export blob is empty');
      const url2 = window.URL.createObjectURL(backendBlob as Blob);
      const a2 = document.createElement('a');
      a2.href = url2;
      a2.download = `loi-cadre-${loiCadreId}.xlsx`;
      a2.click();
      window.URL.revokeObjectURL(url2);
      this.snackBar.open('Rapport exported successfully', 'Close', { duration: 2000 });
    } catch (err: any) {
      // final fallback: try backend as observable
      try {
        this.loiCadreService.exportExcel(loiCadreId).subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob as Blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `loi-cadre-${loiCadreId}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
            this.snackBar.open('Rapport exported successfully', 'Close', { duration: 2000 });
          },
          error: (err2) => {
            this.snackBar.open('Error exporting rapport: ' + (err2?.message || err2), 'Close', { duration: 3000 });
          },
        });
      } catch (err2: any) {
        this.snackBar.open('Error exporting rapport: ' + (err2?.message || err2 || err?.message || err), 'Close', { duration: 3000 });
      }
    }
  }

  getPostesCount(loiCadre: LoiCadre): number {
    return loiCadre.postes?.length || 0;
  }

  getMouvementsCount(loiCadre: LoiCadre): number {
    return loiCadre.mouvements?.length || 0;
  }
}
