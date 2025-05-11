import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoiCadreService } from '../../core/services/loi-cadre.service';
import { LoiCadre } from '../../core/models/loi-cadre.model';

@Component({
  selector: 'app-loi-cadre-form',
  templateUrl: './loi-cadre-form.component.html',
})
export class LoiCadreFormComponent implements OnInit {
  loi: LoiCadre = {
    annee: new Date().getFullYear(),
    version: 1,
    statut: 'INITIALE',
  };

  editMode = false;

  constructor(
    private loiCadreService: LoiCadreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loiCadreService.getById(+id).subscribe((data) => {
        this.loi = data;
      });
    }
  }

  onSubmit(): void {
    if (this.editMode && this.loi.id) {
      this.loiCadreService.update(this.loi.id, this.loi).subscribe(() => {
        this.router.navigate(['/loi-cadre']);
      });
    } else {
      this.loiCadreService.create(this.loi).subscribe(() => {
        this.router.navigate(['/loi-cadre']);
      });
    }
  }
}

