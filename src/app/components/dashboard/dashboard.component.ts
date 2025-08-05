import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { Departement } from "../../models/departement";
import { Etablissement } from "../../models/etablissement";
import { LoiCadre } from "../../models/loi-cadre";
import { Mouvement } from "../../models/mouvement";
import { Utilisateur } from "../../models/utilisateur";
import { DepartementService } from "../../services/departement.service";
import { EtablissementService } from "../../services/etablissement.service";
import { LoiCadreService } from "../../services/loi-cadre.service";
import { MouvementService } from "../../services/mouvement.service";
import { UtilisateurService } from "../../services/utilisateur.service";
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  getEtablissementNomByMouvement(_t97: Mouvement) {
    return (
      this.etablissements.find(
        (e) => e.id === _t97.posteConcerne?.etablissement?.id
      )?.nom || "N/A"
    );
  }
  filterForm: FormGroup;
  utilisateur: Utilisateur | null = null;
  loisCadres: LoiCadre[] = [];
  mouvements: Mouvement[] = [];
  notifications: { id: number; message: string }[] = [];
  departements: Departement[] = [];
  etablissements: Etablissement[] = [];
  stats = { utilisateurs: 0, etablissements: 0, loisCadres: 0, mouvements: 0 };

  constructor(
    private utilisateurService: UtilisateurService,
    private loiCadreService: LoiCadreService,
    private mouvementService: MouvementService,
    private departementService: DepartementService,
    private etablissementService: EtablissementService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      departementId: [null],
      etablissementId: [null],
      annee: [new Date().getFullYear()],
    });
  }

  ngOnInit() {
    this.utilisateur = this.utilisateurService.getCurrentUser();
    this.departementService
      .getAll()
      .subscribe((depts) => (this.departements = depts));
    this.etablissementService
      .getAll()
      .subscribe((etabs) => (this.etablissements = etabs));
    this.loiCadreService.getAll().subscribe((lois) => {
      this.loisCadres = lois;
      this.stats.loisCadres = lois.length;
    });
    this.mouvementService.getAll().subscribe((mouvs) => {
      this.mouvements = mouvs;
      this.stats.mouvements = mouvs.length;
    });
    this.utilisateurService
      .getAll()
      .subscribe((users) => (this.stats.utilisateurs = users.length));
    this.etablissementService
      .getAll()
      .subscribe((etabs) => (this.stats.etablissements = etabs.length));
    // Fetch notifications from backend or keep mock
    this.notifications = [
      { id: 1, message: "Nouvelle Loi Cadre en attente" },
      { id: 2, message: "Mouvement soumis pour validation" },
    ];
    this.filterForm.valueChanges.subscribe(() => this.loadFilteredData());
  }

  loadFilteredData() {
    const { departementId, etablissementId, annee } = this.filterForm.value;
    this.loiCadreService.getAll().subscribe((lois) => {
      this.loisCadres = lois.filter((l) => l.annee === annee);
    });
    this.mouvementService.getAll().subscribe((mouvs) => {
      this.mouvements = mouvs.filter(
        (m) =>
          (!etablissementId ||
            m.posteConcerne?.etablissement?.id === etablissementId) &&
          (!departementId ||
            m.posteConcerne?.etablissement?.departementsID === departementId)
      );
    });
  }
}
