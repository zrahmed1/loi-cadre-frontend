import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PosteBudgetaireService } from '../../core/services/poste-budgetaire.service';
import { PosteBudgetaire } from '../../core/models/poste-budgetaire.model';
import { EtablissementService } from '../../core/services/etablissement.service';
import { Etablissement } from '../../core/models/etablissement.model';

@Component({
  selector: 'app-poste-add',
  templateUrl: './poste-add.component.html'
})
export class PosteAddComponent implements OnInit {
  poste: PosteBudgetaire = {
    codePoste: '',
    etat: 'VACANT',
    effectifInitial: 1,
    effectifFinal: 1,
  };

  loiCadreId!: number;
  etablissements: Etablissement[] = [];

  constructor(
    private posteService: PosteBudgetaireService,
    private etablissementService: EtablissementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loiCadreId = +this.route.snapshot.paramMap.get('id')!;
    this.etablissementService.getAll().subscribe(data => {
      this.etablissements = data;
    });
  }

  onSubmit(): void {
    this.posteService.addPosteToLoi(this.loiCadreId, this.poste).subscribe(() => {
      this.router.navigate(['/loi-cadre/view', this.loiCadreId]);
    });
  }
}
