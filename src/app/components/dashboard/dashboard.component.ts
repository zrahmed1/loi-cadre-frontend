import { Component, OnInit } from "@angular/core";
import { PosteBudgetaireService } from "../../services/poste-budgetaire.service";
import { MouvementService } from "../../services/mouvement.service";
import { LoiCadreService } from "../../services/loi-cadre.service";
import { UtilisateurService } from "../../services/utilisateur.service";
import { EffectifSummary } from "../../models/effectif-summary";
import { StatutMouvement } from "../../models/mouvement";
import { StatutLoiCadre } from "../../models/loi-cadre";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { CommonModule } from "@angular/common";
import { catchError, throwError } from "rxjs";
import { Router } from "@angular/router";
import { MatSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatSpinner,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  effectifSummaries: EffectifSummary[] = [];
  pendingMouvementsCount: number = 0;
  loiCadresInitialeCount: number = 0;
  loiCadresEnvoeeDbCount: number = 0;
  loiCadresDefinitiveCount: number = 0;
  totalUtilisateurs: number = 0;
  isLoading: boolean = true;
  effectifChart: any;

  constructor(
    private posteBudgetaireService: PosteBudgetaireService,
    private mouvementService: MouvementService,
    private loiCadreService: LoiCadreService,
    private utilisateurService: UtilisateurService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEffectifSummaries();
    this.loadPendingMouvements();
    this.loadLoiCadresCounts();
    this.loadTotalUtilisateurs();
  }

  loadEffectifSummaries(): void {
    this.posteBudgetaireService
      .getEffectifSummary()
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading effectif summaries: " + err.message,
            "Close",
            { duration: 3000 }
          );
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (summaries) => {
          this.effectifSummaries = summaries;
          this.updateEffectifChart();
        },
      });
  }

  loadPendingMouvements(): void {
    this.mouvementService
      .getByStatus(StatutMouvement.EN_ATTENTE)
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading pending mouvements: " + err.message,
            "Close",
            { duration: 3000 }
          );
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (mouvements) => {
          this.pendingMouvementsCount = mouvements.length;
        },
      });
  }

  loadLoiCadresCounts(): void {
    this.loiCadreService
      .getByStatut(StatutLoiCadre.INITIALE)
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading loi cadres: " + err.message,
            "Close",
            { duration: 3000 }
          );
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (lois) => {
          this.loiCadresInitialeCount = lois.length;
        },
      });
    this.loiCadreService.getByStatut(StatutLoiCadre.ENVOYEE_DB).subscribe({
      next: (lois) => {
        this.loiCadresEnvoeeDbCount = lois.length;
      },
    });
    this.loiCadreService.getByStatut(StatutLoiCadre.DEFINITIVE).subscribe({
      next: (lois) => {
        this.loiCadresDefinitiveCount = lois.length;
        this.isLoading = false;
      },
    });
  }

  loadTotalUtilisateurs(): void {
    this.utilisateurService
      .getAll()
      .pipe(
        catchError((err) => {
          this.snackBar.open(
            "Error loading utilisateurs: " + err.message,
            "Close",
            { duration: 3000 }
          );
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (utilisateurs) => {
          this.totalUtilisateurs = utilisateurs.length;
        },
      });
  }

  updateEffectifChart(): void {
    this.effectifChart = {
      type: "bar",
      data: {
        labels: this.effectifSummaries.map(
          (summary) => `Etablissement ${summary.etablissementId}`
        ),
        datasets: [
          {
            label: "Total Initial",
            data: this.effectifSummaries.map((summary) => summary.totalInitial),
            backgroundColor: "#42A5F5",
            borderColor: "#1E88E5",
            borderWidth: 1,
          },
          {
            label: "Total Final",
            data: this.effectifSummaries.map((summary) => summary.totalFinal),
            backgroundColor: "#66BB6A",
            borderColor: "#388E3C",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Effectif Count" },
          },
          x: {
            title: { display: true, text: "Etablissement" },
          },
        },
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Effectif Summary by Etablissement" },
        },
      },
    };
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
