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
import { Departement, DepartementDto } from "../../../models/departement";
import { DepartementService } from "../../../services/departement.service";
import { EtablissementService } from "../../../services/etablissement.service";
import { DepartementModalComponent } from "../departement-modal/departement-create-modal.component";

@Component({
  selector: "app-departement-list",
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
    DepartementModalComponent,
  ],
  templateUrl: "./departement-list.component.html",
  styleUrls: ["./departement-list.component.scss"],
})
export class DepartementListComponent implements OnInit {
  departements: DepartementDto[] = [];
  displayedColumns: string[] = ["code", "nom", "etablissementNom", "responsableNom", "actions"];
  searchEtablissementCode: string = "";
  isLoading: boolean = false;

  constructor(
    private departementService: DepartementService,
    private etablissementService: EtablissementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDepartements();
  }

  loadDepartements(): void {
    this.isLoading = true;
    this.departementService
      .getAll()
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading departements: " + err.message,
            "Close",
            { duration: 3000 }
          );
          this.isLoading = false;
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (departements) => {
          this.departements = departements;
          this.isLoading = false;
        },
      });
  }

  searchByEtablissementCode(): void {
    if (this.searchEtablissementCode) {
      this.isLoading = true;
      this.etablissementService
        .getByCode(this.searchEtablissementCode)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error finding etablissement: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.departements = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (etablissement) => {
            this.departementService
              .getByEtablissement(etablissement.id!)
              .subscribe({
                next: (departements) => {
                  this.departements = departements;
                  this.isLoading = false;
                },
                error: (err) => {
                  this.snackBar.open(
                    "Error loading departements: " + err.message,
                    "Close",
                    { duration: 3000 }
                  );
                  this.isLoading = false;
                },
              });
          },
        });
    } else {
      this.loadDepartements();
    }
  }

  resetSearch(): void {
    this.searchEtablissementCode = "";
    this.loadDepartements();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(DepartementModalComponent, {
      width: "400px",
      data: { departement: null },
      ariaLabel: "Create Departement Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDepartements();
      }
    });
  }

  openEditModal(departement: DepartementDto): void {
    // Convert DTO back to the form model for editing
    const formDepartement: Departement = {
      id: departement.id,
      code: departement.code,
      nom: departement.nom,
      etablissementId: departement.etablissementId,
      responsable: departement.responsableId ? { id: departement.responsableId } : undefined
    };
    
    const dialogRef = this.dialog.open(DepartementModalComponent, {
      width: "400px",
      data: { departement: formDepartement },
      ariaLabel: "Edit Departement Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDepartements();
      }
    });
  }

  deleteDepartement(id: number): void {
    if (confirm("Are you sure you want to delete this departement?")) {
      this.isLoading = true;
      this.departementService
        .delete(id)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error deleting departement: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: () => {
            this.snackBar.open("Departement deleted successfully", "Close", {
              duration: 2000,
            });
            this.loadDepartements();
          },
        });
    }
  }
}
