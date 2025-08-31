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
import { MouvementModalComponent } from "../mouvement-modal/mouvement-modal.component";
import { LoiCadre, LoiCadreDto } from "../../../models/loi-cadre";
import {
  Mouvement,
  MouvementDto,
  TypeMouvement,
  StatutMouvement,
} from "../../../models/mouvement";
import { PosteBudgetaire } from "../../../models/poste-budgetaire";
import { Utilisateur } from "../../../models/utilisateur";
import { LoiCadreService } from "../../../services/loi-cadre.service";
import { MouvementService } from "../../../services/mouvement.service";

@Component({
  selector: "app-mouvement-list",
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
    MouvementModalComponent,
  ],
  templateUrl: "./mouvement-list.component.html",
  styleUrls: ["./mouvement-list.component.scss"],
})
export class MouvementListComponent implements OnInit {
  mouvements: MouvementDto[] = [];
  displayedColumns: string[] = [
    "type",
    "description",
    "dateEffet",
    "posteOrigineCode",
    "posteDestinationCode",
    "effectif",
    "status",
    "loiCadreAnnee",
    "creeParNom",
    "dateCreation",
    "actions",
  ];
  searchType: TypeMouvement | "" = "";
  searchStatus: StatutMouvement | "" = "";
  searchLoiCadreId: string = "";
  typeMouvementValues: TypeMouvement[] = Object.values(TypeMouvement);
  statutMouvementValues: StatutMouvement[] = Object.values(StatutMouvement);
  loisCadres: LoiCadreDto[] = [];
  isLoading: boolean = false;

  constructor(
    private mouvementService: MouvementService,
    private loiCadreService: LoiCadreService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMouvements();
    this.loadLoisCadres();
  }

  loadMouvements(): void {
    this.isLoading = true;
    this.mouvementService
      .getAll()
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading mouvements: " + err.message,
            "Close",
            { duration: 3000 }
          );
          this.isLoading = false;
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (mouvements: MouvementDto[]) => {
          this.mouvements = mouvements;
          this.isLoading = false;
        },
      });
  }

  loadLoisCadres(): void {
    this.loiCadreService.getAll().subscribe({
      next: (loisCadres: LoiCadreDto[]) => {
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

  searchByType(): void {
    if (this.searchType) {
      this.isLoading = true;
      this.mouvementService
        .getByType(this.searchType)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching mouvements: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.mouvements = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (mouvements: MouvementDto[]) => {
            this.mouvements = mouvements;
            this.isLoading = false;
          },
        });
    } else {
      this.loadMouvements();
    }
  }

  searchByStatus(): void {
    if (this.searchStatus) {
      this.isLoading = true;
      this.mouvementService
        .getByStatus(this.searchStatus)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching mouvements: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.mouvements = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (mouvements: MouvementDto[]) => {
            this.mouvements = mouvements;
            this.isLoading = false;
          },
        });
    } else {
      this.loadMouvements();
    }
  }

  searchByLoiCadre(): void {
    if (this.searchLoiCadreId) {
      this.isLoading = true;
      this.mouvementService
        .getByLoiCadre(+this.searchLoiCadreId)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching mouvements: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.mouvements = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (mouvements: MouvementDto[]) => {
            this.mouvements = mouvements;
            this.isLoading = false;
          },
        });
    } else {
      this.loadMouvements();
    }
  }

  resetSearch(): void {
    this.searchType = "";
    this.searchStatus = "";
    this.searchLoiCadreId = "";
    this.loadMouvements();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(MouvementModalComponent, {
      width: "600px",
      data: { mouvement: null },
      ariaLabel: "Create Mouvement Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMouvements();
      }
    });
  }

  openEditModal(mouvement: MouvementDto): void {
    // Convert DTO back to the form model for editing
    const formMouvement: Mouvement = {
      id: mouvement.id,
      type: mouvement.type,
      description: mouvement.description,
      dateEffet: mouvement.dateEffet,
      posteOrigineId: mouvement.posteOrigineId,
      posteDestinationId: mouvement.posteDestinationId,
      effectif: mouvement.effectif,
      status: mouvement.status,
      loiCadreId: mouvement.loiCadreId,
      creeParId: mouvement.creeParId,
      dateCreation: mouvement.dateCreation
    };
    
    const dialogRef = this.dialog.open(MouvementModalComponent, {
      width: "600px",
      data: { mouvement: formMouvement },
      ariaLabel: "Edit Mouvement Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadMouvements();
      }
    });
  }

  deleteMouvement(id: number): void {
    if (confirm("Are you sure you want to delete this mouvement?")) {
      this.isLoading = true;
      this.mouvementService
        .delete(id)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error deleting mouvement: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: () => {
            this.snackBar.open("Mouvement deleted successfully", "Close", {
              duration: 2000,
            });
            this.loadMouvements();
          },
        });
    }
  }
}
