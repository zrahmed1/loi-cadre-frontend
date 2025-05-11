import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Mouvement} from '../../models/mouvement.model';
import {MouvementService} from '../../services/mouvement.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-historique-mouvements',
  standalone: true,
  templateUrl: './historique-mouvements.component.html',
  imports: [CommonModule,FormsModule],
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
    this.mouvementService.getByLoiCadre(this.loiId).subscribe((data: Mouvement[]) => {
      this.mouvements = data.sort((a, b) =>
        new Date(a.dateEffet).getTime() - new Date(b.dateEffet).getTime()
      );
    });
  }
}
