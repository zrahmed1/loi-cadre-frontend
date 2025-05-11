import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PosteBudgetaire} from '../../models/poste-budgetaire.model';
import {PosteBudgetaireService} from '../../services/poste-budgetaire.service';
import {Etablissement} from '../../models/etablissement.model';
import {EtablissementService} from '../../services/etablissement.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-poste-add',
  standalone: true,
  templateUrl: './poste-add.component.html',
  imports: [FormsModule],
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
