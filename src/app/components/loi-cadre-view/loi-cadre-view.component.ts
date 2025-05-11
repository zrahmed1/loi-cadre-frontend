import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoiCadreService } from '../../core/services/loi-cadre.service';
import { LoiCadre } from '../../core/models/loi-cadre.model';

@Component({
  selector: 'app-loi-cadre-view',
  templateUrl: './loi-cadre-view.component.html',
})
export class LoiCadreViewComponent implements OnInit {
  loi?: LoiCadre;

  constructor(
    private route: ActivatedRoute,
    private loiCadreService: LoiCadreService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loiCadreService.getById(+id).subscribe((data) => {
        this.loi = data;
      });
    }
  }
}
