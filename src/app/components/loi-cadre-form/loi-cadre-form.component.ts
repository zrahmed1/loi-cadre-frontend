import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoiCadre } from '../../models/loi-cadre.model';
import { LoiCadreService } from '../../services/loi-cadre.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-loi-cadre-form',
  standalone: true,
  templateUrl: './loi-cadre-form.component.html',
  styleUrls: ['./loi-cadre-form.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoiCadreFormComponent implements OnInit {
  loi: LoiCadre = {
    annee: new Date().getFullYear(),
    version: 1,
    statut: 'INITIALE',
    postes: [],
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
      this.loiCadreService.getById(+id).subscribe((data: LoiCadre) => {
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
