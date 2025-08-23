import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, throwError } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { EtablissementModalComponent } from "../etablissement-modal/etablissement-create-modal.component";
import { Etablissement } from "../../../models/etablissement";
import { DepartementService } from "../../../services/departement.service";
import { EtablissementService } from "../../../services/etablissement.service";

@Component({
  selector: "app-etablissement-list",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    EtablissementModalComponent,
  ],
  templateUrl: "./etablissement-list.component.html",
  styleUrls: ["./etablissement-list.component.scss"],
})
export class EtablissementListComponent implements OnInit {
  etablissements: Etablissement[] = [];
  displayedColumns: string[] = [
    "code",
    "nom",
    "responsableId",
    "departements",
    "actions",
  ];
  searchCode: string = "";
  searchResponsableId: string = "";
  isLoading: boolean = false;

  constructor(
    private etablissementService: EtablissementService,
    private departementService: DepartementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEtablissements();
  }

  loadEtablissements(): void {
    this.isLoading = true;
    this.etablissementService
      .getAll()
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading etablissements: " + err.message,
            "Close",
            { duration: 3000 }
          );
          this.isLoading = false;
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (etablissements) => {
          this.etablissements = etablissements;
          this.loadDepartements();
          this.isLoading = false;
        },
      });
  }

  loadDepartements(): void {
    this.etablissements.forEach((etablissement) => {
      if (etablissement.id) {
        this.departementService.getByEtablissement(etablissement.id).subscribe({
          next: (departements) => {
            etablissement.departements = departements;
          },
          error: (err) =>
            console.error(
              `Error loading departements for etablissement ${etablissement.id}:`,
              err
            ),
        });
      }
    });
  }

  searchByCode(): void {
    if (this.searchCode) {
      this.isLoading = true;
      this.etablissementService
        .getByCode(this.searchCode)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching etablissement: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.etablissements = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (etablissement) => {
            this.etablissements = [etablissement];
            this.loadDepartements();
            this.isLoading = false;
          },
        });
    } else {
      this.loadEtablissements();
    }
  }

  searchByResponsable(): void {
    if (this.searchResponsableId) {
      this.isLoading = true;
      this.etablissementService
        .getByResponsable(+this.searchResponsableId)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching etablissements by responsible: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.etablissements = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (etablissements) => {
            this.etablissements = etablissements;
            this.loadDepartements();
            this.isLoading = false;
          },
        });
    } else {
      this.loadEtablissements();
    }
  }

  resetSearch(): void {
    this.searchCode = "";
    this.searchResponsableId = "";
    this.loadEtablissements();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(EtablissementModalComponent, {
      width: "400px",
      data: { etablissement: null },
      ariaLabel: "Create Etablissement Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEtablissements();
      }
    });
  }

  openEditModal(etablissement: Etablissement): void {
    const dialogRef = this.dialog.open(EtablissementModalComponent, {
      width: "400px",
      data: { etablissement },
      ariaLabel: "Edit Etablissement Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadEtablissements();
      }
    });
  }

  deleteEtablissement(id: number): void {
    if (confirm("Are you sure you want to delete this etablissement?")) {
      this.isLoading = true;
      this.etablissementService
        .delete(id)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error deleting etablissement: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: () => {
            this.snackBar.open("Etablissement deleted successfully", "Close", {
              duration: 2000,
            });
            this.loadEtablissements();
          },
        });
    }
  }

  getDepartementNames(etablissement: Etablissement): string {
    return etablissement.departements?.map((d) => d.nom).join(", ") || "-";
  }
}
