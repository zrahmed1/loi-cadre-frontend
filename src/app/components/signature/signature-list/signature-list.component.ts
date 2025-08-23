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
import { LoiCadre } from "../../../models/loi-cadre";
import { Mouvement } from "../../../models/mouvement";
import { SignatureElectronique } from "../../../models/signature-electronique";
import { Utilisateur } from "../../../models/utilisateur";
import { LoiCadreService } from "../../../services/loi-cadre.service";
import { MouvementService } from "../../../services/mouvement.service";
import { SignatureService } from "../../../services/signature.service";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { SignatureModalComponent } from "../signature-modal/signature-modal.component";

@Component({
  selector: "app-signature-list",
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
    SignatureModalComponent,
  ],
  templateUrl: "./signature-list.component.html",
  styleUrls: ["./signature-list.component.scss"],
})
export class SignatureListComponent implements OnInit {
  signatures: SignatureElectronique[] = [];
  displayedColumns: string[] = [
    "status",
    "loiCadre",
    "mouvement",
    "signataire",
    "dateSignature",
    "ordre",
    "circuitId",
    "motifRejet",
    "actions",
  ];
  searchLoiCadreId: string = "";
  searchMouvementId: string = "";
  searchSignataireId: string = "";
  loisCadres: LoiCadre[] = [];
  mouvements: Mouvement[] = [];
  utilisateurs: Utilisateur[] = [];
  isLoading: boolean = false;

  constructor(
    private signatureService: SignatureService,
    private loiCadreService: LoiCadreService,
    private mouvementService: MouvementService,
    private utilisateurService: UtilisateurService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadSignatures();
    this.loadLoisCadres();
    this.loadMouvements();
    this.loadUtilisateurs();
  }

  loadSignatures(): void {
    this.isLoading = true;
    this.signatureService
      .getAll()
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading signatures: " + err.message,
            "Close",
            { duration: 3000 }
          );
          this.isLoading = false;
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (signatures) => {
          this.signatures = signatures;
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

  loadMouvements(): void {
    this.mouvementService.getAll().subscribe({
      next: (mouvements) => {
        this.mouvements = mouvements;
      },
      error: (err) =>
        this.snackBar.open(
          "Error loading mouvements: " + err.message,
          "Close",
          { duration: 3000 }
        ),
    });
  }

  loadUtilisateurs(): void {
    this.utilisateurService.getAll().subscribe({
      next: (utilisateurs) => {
        this.utilisateurs = utilisateurs;
      },
      error: (err) =>
        this.snackBar.open(
          "Error loading utilisateurs: " + err.message,
          "Close",
          { duration: 3000 }
        ),
    });
  }

  searchByLoiCadre(): void {
    if (this.searchLoiCadreId) {
      this.isLoading = true;
      this.signatureService
        .getByLoiCadre(+this.searchLoiCadreId)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching signatures: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.signatures = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (signatures) => {
            this.signatures = signatures;
            this.isLoading = false;
          },
        });
    } else {
      this.loadSignatures();
    }
  }

  searchByMouvement(): void {
    if (this.searchMouvementId) {
      this.isLoading = true;
      this.signatureService
        .getByMouvement(+this.searchMouvementId)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching signatures: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.signatures = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (signatures) => {
            this.signatures = signatures;
            this.isLoading = false;
          },
        });
    } else {
      this.loadSignatures();
    }
  }

  searchBySignataire(): void {
    if (this.searchSignataireId) {
      this.isLoading = true;
      this.signatureService
        .getByUtilisateur(+this.searchSignataireId)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching signatures: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.signatures = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (signatures) => {
            this.signatures = signatures;
            this.isLoading = false;
          },
        });
    } else {
      this.loadSignatures();
    }
  }

  resetSearch(): void {
    this.searchLoiCadreId = "";
    this.searchMouvementId = "";
    this.searchSignataireId = "";
    this.loadSignatures();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(SignatureModalComponent, {
      width: "600px",
      data: { signature: null, mode: "create" },
      ariaLabel: "Create Signature Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSignatures();
      }
    });
  }

  openValidateModal(signature: SignatureElectronique): void {
    const dialogRef = this.dialog.open(SignatureModalComponent, {
      width: "600px",
      data: { signature, mode: "validate" },
      ariaLabel: "Validate Signature Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSignatures();
      }
    });
  }

  openRejectModal(signature: SignatureElectronique): void {
    const dialogRef = this.dialog.open(SignatureModalComponent, {
      width: "600px",
      data: { signature, mode: "reject" },
      ariaLabel: "Reject Signature Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadSignatures();
      }
    });
  }

  deleteSignature(id: number): void {
    if (confirm("Are you sure you want to delete this signature?")) {
      this.isLoading = true;
      this.signatureService
        .delete(id)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error deleting signature: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: () => {
            this.snackBar.open("Signature deleted successfully", "Close", {
              duration: 2000,
            });
            this.loadSignatures();
          },
        });
    }
  }

  getLoiCadreName(loiCadre?: LoiCadre): string {
    return loiCadre ? `${loiCadre.annee} (v${loiCadre.version})` : "-";
  }

  getMouvementName(mouvement?: Mouvement): string {
    return mouvement
      ? `${mouvement.type} (${mouvement.description || "-"})`
      : "-";
  }

  getSignataireName(signataire?: Utilisateur): string {
    return signataire ? `${signataire.nom} ${signataire.prenom || ""}` : "-";
  }
}
