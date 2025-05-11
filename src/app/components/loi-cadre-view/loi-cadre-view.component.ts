import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {LoiCadre} from '../../models/loi-cadre.model';
import {LoiCadreService} from '../../services/loi-cadre.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-loi-cadre-view',
  templateUrl: './loi-cadre-view.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
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
      this.loiCadreService.getById(+id).subscribe((data: LoiCadre | undefined) => {
        this.loi = data;
      });
    }
  }
}
