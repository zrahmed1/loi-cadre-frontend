import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MouvementService } from '../../core/services/mouvement.service';
import { Mouvement } from '../../core/models/mouvement.model';

@Component({
  selector: 'app-historique-mouvements',
  templateUrl: './historique-mouvements.component.html'
})
export class HistoriqueMouvementsComponent implements OnInit {
  mouvements: Mouvement[] = [];
  loiId!: number;

  constructor(
    private mouvementService: MouvementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loiId = +this.route.snapshot.paramMap.get('id')!;
    this.mouvementService.getByLoiCadre(this.loiId).subscribe(data => {
      this.mouvements = data.sort((a, b) =>
        new Date(a.dateEffet).getTime() - new Date(b.dateEffet).getTime()
      );
    });
  }
}
