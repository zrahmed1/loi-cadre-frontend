import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Departement } from '../../../models/departement';
import { DepartementService } from '../../../services/departement.service';
import { DepartementCreateModalComponent } from '../departement-modal/departement-create-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-departement-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.scss']
})
export class DepartementListComponent implements OnInit {
  departements: Departement[] = [];

  constructor(private departementService: DepartementService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadDepartements();
  }

  loadDepartements() {
    this.departementService.getAll().subscribe(depts => this.departements = depts);
  }

  openDepartementModal(departement?: Departement): void {
    const dialogRef = this.dialog.open(DepartementCreateModalComponent, {
      width: '500px',
      data: departement ? departement : {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.loadDepartements();
      }
    });
  }

  delete(id: number) {
    this.departementService.delete(id).subscribe(() => this.loadDepartements());
  }
}
