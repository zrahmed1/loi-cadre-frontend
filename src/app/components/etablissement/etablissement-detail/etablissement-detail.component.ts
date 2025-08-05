import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { Etablissement } from "../../../models/etablissement";
import { Mouvement } from "../../../models/mouvement";
import { PosteBudgetaire } from "../../../models/poste-budgetaire";
import { EtablissementService } from "../../../services/etablissement.service";
import { MouvementService } from "../../../services/mouvement.service";
import { PosteBudgetaireService } from "../../../services/poste-budgetaire.service";

@Component({
  selector: "app-etablissement-detail",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./etablissement-detail.component.html",
  styleUrls: ["./etablissement-detail.component.css"],
})
export class EtablissementDetailComponent implements OnInit {
  etablissement: Etablissement | null = null;
  postes: PosteBudgetaire[] = [];
  mouvements: Mouvement[] = [];

  constructor(
    private etablissementService: EtablissementService,
    private posteBudgetaireService: PosteBudgetaireService,
    private mouvementService: MouvementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.etablissementService.getById(id).subscribe((etab) => {
      this.etablissement = etab;
      this.posteBudgetaireService
        .getByEtablissement(id)
        .subscribe((postes) => (this.postes = postes));
      this.mouvementService.getAll().subscribe((mouvs) => {
        this.mouvements = mouvs.filter(
          (m) => m.posteConcerne?.etablissementId === id
        );
      });
    });
  }

  addMouvement() {
    this.router.navigate(["/mouvement/create"], {
      queryParams: { etablissementId: this.etablissement?.id },
    });
  }
}
