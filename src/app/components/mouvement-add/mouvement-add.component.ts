import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Mouvement} from '../../models/mouvement.model';
import {PosteBudgetaire} from '../../models/poste-budgetaire.model';
import {MouvementService} from '../../services/mouvement.service';
import {PosteBudgetaireService} from '../../services/poste-budgetaire.service';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-mouvement-add',
  standalone: true,
  templateUrl: './mouvement-add.component.html',
  imports: [FormsModule],
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
    this.posteService.getAll().subscribe((data: PosteBudgetaire[]) => this.postes = data);
  }

  onSubmit(): void {
    this.mouvementService.addMouvementToLoi(this.loiCadreId, this.mouvement).subscribe(() => {
      this.router.navigate(['/loi-cadre/view', this.loiCadreId]);
    });
  }
}
