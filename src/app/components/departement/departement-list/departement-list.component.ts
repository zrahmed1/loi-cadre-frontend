import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Departement } from '../../../models/departement';
import { DepartementService } from '../../../services/departement.service';

@Component({
  selector: 'app-departement-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.scss']
})
export class DepartementListComponent implements OnInit {
  departements: Departement[] = [];

  constructor(private departementService: DepartementService) {}

  ngOnInit() {
    this.departementService.getAll().subscribe(depts => this.departements = depts);
  }

  delete(id: number) {
    this.departementService.delete(id).subscribe(() => this.ngOnInit());
  }
}