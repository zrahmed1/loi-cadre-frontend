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
import { Etablissement } from "../../../models/etablissement";
import { Grade } from "../../../models/grade";
import { LoiCadre } from "../../../models/loi-cadre";
import { PosteBudgetaire, EtatPoste } from "../../../models/poste-budgetaire";
import { EtablissementService } from "../../../services/etablissement.service";
import { GradeService } from "../../../services/grade.service";
import { LoiCadreService } from "../../../services/loi-cadre.service";
import { PosteBudgetaireService } from "../../../services/poste-budgetaire.service";
import { PosteBudgetaireModalComponent } from "../poste-budgetaire-modal/poste-budgetaire-modal.component";

@Component({
  selector: "app-poste-budgetaire-list",
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
    PosteBudgetaireModalComponent,
  ],
  templateUrl: "./poste-budgetaire-list.component.html",
  styleUrls: ["./poste-budgetaire-list.component.scss"],
})
export class PosteBudgetaireListComponent implements OnInit {
  postes: PosteBudgetaire[] = [];
  displayedColumns: string[] = [
    "codePoste",
    "description",
    "effectifInitial",
    "effectifFinal",
    "etat",
    "loiCadre",
    "grade",
    "etablissement",
    "actions",
  ];
  searchLoiCadreId: string = "";
  searchGradeId: string = "";
  searchEtablissementId: string = "";
  searchEtat: EtatPoste | "" = "";
  loisCadres: LoiCadre[] = [];
  grades: Grade[] = [];
  etablissements: Etablissement[] = [];
  etatPosteValues: EtatPoste[] = Object.values(EtatPoste);
  isLoading: boolean = false;

  constructor(
    private posteBudgetaireService: PosteBudgetaireService,
    private loiCadreService: LoiCadreService,
    private gradeService: GradeService,
    private etablissementService: EtablissementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPostes();
    this.loadLoisCadres();
    this.loadGrades();
    this.loadEtablissements();
  }

  loadPostes(): void {
    this.isLoading = true;
    this.posteBudgetaireService
      .getAll()
      .pipe(
        catchError((err) => {
          this.snackBar.open("Error loading postes: " + err.message, "Close", {
            duration: 3000,
          });
          this.isLoading = false;
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (postes) => {
          this.postes = postes;
          this.isLoading = false;
        },
      });
  }

  loadLoisCadres(): void {
    this.loiCadreService.getAll().subscribe({
      next: (loisCadres) => {
        this.loisCadres = loisCadres;
      },
      error: (err) =>
        this.snackBar.open(
          "Error loading lois cadres: " + err.message,
          "Close",
          { duration: 3000 }
        ),
    });
  }

  loadGrades(): void {
    this.gradeService.getAll().subscribe({
      next: (grades) => {
        this.grades = grades;
      },
      error: (err) =>
        this.snackBar.open("Error loading grades: " + err.message, "Close", {
          duration: 3000,
        }),
    });
  }

  loadEtablissements(): void {
    this.etablissementService.getAll().subscribe({
      next: (etablissements) => {
        this.etablissements = etablissements;
      },
      error: (err) =>
        this.snackBar.open(
          "Error loading etablissements: " + err.message,
          "Close",
          { duration: 3000 }
        ),
    });
  }

  searchByLoiCadre(): void {
    if (this.searchLoiCadreId) {
      this.isLoading = true;
      this.posteBudgetaireService
        .getByLoiCadre(+this.searchLoiCadreId)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching postes: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.postes = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (postes) => {
            this.postes = postes;
            this.isLoading = false;
          },
        });
    } else {
      this.loadPostes();
    }
  }

  searchByGrade(): void {
    if (this.searchGradeId) {
      this.isLoading = true;
      this.posteBudgetaireService
        .getByGrade(+this.searchGradeId)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching postes: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.postes = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (postes) => {
            this.postes = postes;
            this.isLoading = false;
          },
        });
    } else {
      this.loadPostes();
    }
  }

  searchByEtablissement(): void {
    if (this.searchEtablissementId) {
      this.isLoading = true;
      this.posteBudgetaireService
        .getByEtablissement(+this.searchEtablissementId)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching postes: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.postes = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (postes) => {
            this.postes = postes;
            this.isLoading = false;
          },
        });
    } else {
      this.loadPostes();
    }
  }

  searchByEtat(): void {
    if (this.searchEtat) {
      this.isLoading = true;
      this.posteBudgetaireService
        .getByEtat(this.searchEtat)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching postes: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.postes = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (postes) => {
            this.postes = postes;
            this.isLoading = false;
          },
        });
    } else {
      this.loadPostes();
    }
  }

  resetSearch(): void {
    this.searchLoiCadreId = "";
    this.searchGradeId = "";
    this.searchEtablissementId = "";
    this.searchEtat = "";
    this.loadPostes();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(PosteBudgetaireModalComponent, {
      width: "600px",
      data: { poste: null },
      ariaLabel: "Create Poste Budgetaire Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPostes();
      }
    });
  }

  openEditModal(poste: PosteBudgetaire): void {
    const dialogRef = this.dialog.open(PosteBudgetaireModalComponent, {
      width: "600px",
      data: { poste },
      ariaLabel: "Edit Poste Budgetaire Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPostes();
      }
    });
  }

  deletePoste(id: number): void {
    if (confirm("Are you sure you want to delete this poste budgetaire?")) {
      this.isLoading = true;
      this.posteBudgetaireService
        .delete(id)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error deleting poste: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: () => {
            this.snackBar.open("Poste deleted successfully", "Close", {
              duration: 2000,
            });
            this.loadPostes();
          },
        });
    }
  }

  getLoiCadreName(loiCadre?: LoiCadre): string {
    return loiCadre ? `${loiCadre.annee} (v${loiCadre.version})` : "-";
  }

  getGradeName(grade?: Grade): string {
    return grade ? `${grade.libelle} (${grade.code})` : "-";
  }

  getEtablissementName(etablissement?: Etablissement): string {
    return etablissement ? `${etablissement.nom} (${etablissement.code})` : "-";
  }
}
