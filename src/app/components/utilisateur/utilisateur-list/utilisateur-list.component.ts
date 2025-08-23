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
import { Departement } from "../../../models/departement";
import { Etablissement } from "../../../models/etablissement";
import { Utilisateur, Role } from "../../../models/utilisateur";
import { DepartementService } from "../../../services/departement.service";
import { EtablissementService } from "../../../services/etablissement.service";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { UtilisateurModalComponent } from "../utilisateur-modal/utilisateur-modal.component";

@Component({
  selector: "app-utilisateur-list",
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
    UtilisateurModalComponent,
  ],
  templateUrl: "./utilisateur-list.component.html",
  styleUrls: ["./utilisateur-list.component.scss"],
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  displayedColumns: string[] = [
    "nom",
    "prenom",
    "email",
    "role",
    "active",
    "etablissement",
    "departement",
    "lastLogin",
    "actions",
  ];
  searchRole: Role | "" = "";
  searchEtablissementId: string = "";
  searchDepartementId: string = "";
  roles: Role[] = Object.values(Role);
  etablissements: Etablissement[] = [];
  departements: Departement[] = [];
  isLoading: boolean = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private departementService: DepartementService,
    private etablissementService: EtablissementService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
    this.loadEtablissements();
    this.loadDepartements();
  }

  loadUtilisateurs(): void {
    this.isLoading = true;
    this.utilisateurService
      .getAll()
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading utilisateurs: " + err.message,
            "Close",
            { duration: 3000 }
          );
          this.isLoading = false;
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (utilisateurs) => {
          this.utilisateurs = utilisateurs;
          this.isLoading = false;
        },
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

  loadDepartements(): void {
    this.departementService.getAll().subscribe({
      next: (departements) => {
        this.departements = departements;
      },
      error: (err) =>
        this.snackBar.open(
          "Error loading departements: " + err.message,
          "Close",
          { duration: 3000 }
        ),
    });
  }

  filterByRole(): void {
    if (this.searchRole) {
      this.isLoading = true;
      this.utilisateurService
        .getAll()
        .pipe(
          // Assuming no specific endpoint for role filtering
          catchError((err) => {
            this.snackBar.open(
              "Error filtering utilisateurs: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.utilisateurs = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (utilisateurs) => {
            this.utilisateurs = utilisateurs.filter(
              (u) => u.role === this.searchRole
            );
            this.isLoading = false;
          },
        });
    } else {
      this.loadUtilisateurs();
    }
  }

  filterByEtablissement(): void {
    if (this.searchEtablissementId) {
      this.isLoading = true;
      this.utilisateurService
        .getAll()
        .pipe(
          // Assuming no specific endpoint for etablissement filtering
          catchError((err) => {
            this.snackBar.open(
              "Error filtering utilisateurs: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.utilisateurs = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (utilisateurs) => {
            this.utilisateurs = utilisateurs.filter(
              (u) => u.etablissementId === +this.searchEtablissementId
            );
            this.isLoading = false;
          },
        });
    } else {
      this.loadUtilisateurs();
    }
  }

  filterByDepartement(): void {
    if (this.searchDepartementId) {
      this.isLoading = true;
      this.utilisateurService
        .getAll()
        .pipe(
          // Assuming no specific endpoint for departement filtering
          catchError((err) => {
            this.snackBar.open(
              "Error filtering utilisateurs: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.utilisateurs = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (utilisateurs) => {
            this.utilisateurs = utilisateurs.filter(
              (u) => u.departementId === +this.searchDepartementId
            );
            this.isLoading = false;
          },
        });
    } else {
      this.loadUtilisateurs();
    }
  }

  resetSearch(): void {
    this.searchRole = "";
    this.searchEtablissementId = "";
    this.searchDepartementId = "";
    this.loadUtilisateurs();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(UtilisateurModalComponent, {
      width: "600px",
      data: { utilisateur: null },
      ariaLabel: "Create Utilisateur Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUtilisateurs();
      }
    });
  }

  openEditModal(utilisateur: Utilisateur): void {
    const dialogRef = this.dialog.open(UtilisateurModalComponent, {
      width: "600px",
      data: { utilisateur },
      ariaLabel: "Edit Utilisateur Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUtilisateurs();
      }
    });
  }

  deleteUtilisateur(id: number): void {
    if (confirm("Are you sure you want to delete this utilisateur?")) {
      this.isLoading = true;
      this.utilisateurService
        .delete(id)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error deleting utilisateur: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: () => {
            this.snackBar.open("Utilisateur deleted successfully", "Close", {
              duration: 2000,
            });
            this.loadUtilisateurs();
          },
        });
    }
  }

  getEtablissementName(etablissement?: Etablissement): string {
    return etablissement ? `${etablissement.nom} (${etablissement.code})` : "-";
  }

  getDepartementName(departement?: Departement): string {
    return departement ? `${departement.nom} (${departement.code})` : "-";
  }
}
