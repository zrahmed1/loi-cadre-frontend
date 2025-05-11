import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MouvementService } from '../../core/services/mouvement.service';
import { PosteBudgetaireService } from '../../core/services/poste-budgetaire.service';
import { Mouvement } from '../../core/models/mouvement.model';
import { PosteBudgetaire } from '../../core/models/poste-budgetaire.model';

@Component({
  selector: 'app-mouvement-add',
  templateUrl: './mouvement-add.component.html'
})
export class MouvementAddComponent implements OnInit {
  mouvement: Mouvement = { type: 'CREATION', dateEffet: new Date(), description: '' };
  loiCadreId!: number;
  postes: PosteBudgetaire[] = [];

  constructor(
    private mouvementService: MouvementService,
    private posteService: PosteBudgetaireService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loiCadreId = +this.route.snapshot.paramMap.get('id')!;
    this.posteService.getAll().subscribe((data) => this.postes = data);
  }

  onSubmit(): void {
    this.mouvementService.addMouvementToLoi(this.loiCadreId, this.mouvement).subscribe(() => {
      this.router.navigate(['/loi-cadre/view', this.loiCadreId]);
    });
  }
}
