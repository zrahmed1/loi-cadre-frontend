import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, throwError } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoiCadreModalComponent } from "../loi-cadre-modal/loi-cadre-modal.component";
import { LoiCadre, StatutLoiCadre } from "../../../models/loi-cadre";
import { LoiCadreService } from "../../../services/loi-cadre.service";

@Component({
  selector: "app-loi-cadre-list",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    LoiCadreModalComponent,
  ],
  templateUrl: "./loi-cadre-list.component.html",
  styleUrls: ["./loi-cadre-list.component.scss"],
})
export class LoiCadreListComponent implements OnInit {
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
  searchAnnee: string = "";
  searchStatut: StatutLoiCadre | "" = "";
  statutLoiCadreValues: StatutLoiCadre[] = Object.values(StatutLoiCadre);
  isLoading: boolean = false;

  constructor(
    private loiCadreService: LoiCadreService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLoisCadres();
  }

  loadLoisCadres(): void {
    this.isLoading = true;
    this.loiCadreService
      .getAll()
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading lois cadres: " + err.message,
            "Close",
            { duration: 3000 }
          );
          this.isLoading = false;
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (loisCadres) => {
          this.loisCadres = loisCadres;
          this.isLoading = false;
        },
      });
  }

  searchByAnnee(): void {
    if (this.searchAnnee) {
      this.isLoading = true;
      this.loiCadreService
        .getByAnnee(+this.searchAnnee)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching lois cadres: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.loisCadres = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (loisCadres) => {
            this.loisCadres = loisCadres;
            this.isLoading = false;
          },
        });
    } else {
      this.loadLoisCadres();
    }
  }

  searchByStatut(): void {
    if (this.searchStatut) {
      this.isLoading = true;
      this.loiCadreService
        .getByStatut(this.searchStatut)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching lois cadres: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.loisCadres = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (loisCadres) => {
            this.loisCadres = loisCadres;
            this.isLoading = false;
          },
        });
    } else {
      this.loadLoisCadres();
    }
  }

  resetSearch(): void {
    this.searchAnnee = "";
    this.searchStatut = "";
    this.loadLoisCadres();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(LoiCadreModalComponent, {
      width: "400px",
      data: { loiCadre: null },
      ariaLabel: "Create Loi Cadre Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadLoisCadres();
      }
    });
  }

  openEditModal(loiCadre: LoiCadre): void {
    const dialogRef = this.dialog.open(LoiCadreModalComponent, {
      width: "400px",
      data: { loiCadre },
      ariaLabel: "Edit Loi Cadre Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadLoisCadres();
      }
    });
  }

  deleteLoiCadre(id: number): void {
    if (confirm("Are you sure you want to delete this loi cadre?")) {
      this.isLoading = true;
      this.loiCadreService
        .delete(id)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error deleting loi cadre: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: () => {
            this.snackBar.open("Loi Cadre deleted successfully", "Close", {
              duration: 2000,
            });
            this.loadLoisCadres();
          },
        });
    }
  }

  getPostesCount(loiCadre: LoiCadre): number {
    return loiCadre.postes?.length || 0;
  }

  getMouvementsCount(loiCadre: LoiCadre): number {
    return loiCadre.mouvements?.length || 0;
  }
}
